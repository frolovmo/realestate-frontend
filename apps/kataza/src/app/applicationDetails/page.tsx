"use client";
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useSearchParams } from "next/navigation";
import { atom, PermissionHOC } from "@uno/utils";
import { Toast } from "primereact/toast";
import { useAtom } from "jotai";
import { Skeleton } from "primereact/skeleton";
import { approvalStatus } from '@kataza/src/constants';

const { sendRequestAtom } = atom;


const icons = [
  { id: 2, name: "Email", icon: "pi pi-envelope" },
  { id: 3, name: "Call", icon: "pi pi-phone" },
  { id: 5, name: "Meeting", icon: "pi pi-calendar-minus" },
];
const removeComma = (str: string) => {
  return str.replace(/,/g, "")
}
const disbursements = [
  { no: 1, amount: "RWF 11,000,000", date: "15 Mar 2023", status: "Paid" },
  { no: 2, amount: "RWF 2,000,000", date: "22 Jul 2021", status: "Paid" },
  { no: 3, amount: "RWF 1,500,000", date: "09 Nov 2022", status: "Paid" },
  { no: 4, amount: "RWF 3,000,000", date: "30 Jan 2024", status: "Paid" },
  { no: 5, amount: "RWF 4,000,000", date: "05 Aug 2020", status: "Paid" },
];

const repayment = [
  { no: 1, amount: "RWF 11,000,000", date: "15 Mar 2023", status: "Pending" },
  { no: 2, amount: "RWF 2,000,000", date: "22 Jul 2021", status: "Pending" },
  { no: 3, amount: "RWF 1,500,000", date: "09 Nov 2022", status: "Paid" },
  { no: 4, amount: "RWF 3,000,000", date: "30 Jan 2024", status: "Paid" },
  { no: 5, amount: "RWF 4,000,000", date: "05 Aug 2020", status: "Paid" },
];

type EligibilityItem = { eligible: boolean; description: string };

export default function UserDetails() {
  const searchParms = useSearchParams();
  const id = searchParms.get("id");
  const [, sendRequest] = useAtom(sendRequestAtom);
  const toast = useRef<Toast>(null);

  const [creditScoreData, setCreditScoreData] = useState<any>([]);

  const [singleApplication, setSingleApplication] = useState<any>({});
  const [isShareHolderOpen, setIsShareHolderOpen] = useState<boolean>(false);
  const [nationID, setNationID] = useState<string>("");
  const [applicantType, setApplicantType] = useState<string>("Individual");
  const [farmingExpirience, setFarmingExpirience] = useState<string>("");
  const [applicantId, setApplicationId] = useState<string>("")
  const [simulationId, setSimulationId] = useState<string>('')
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [landUPI, setLandUPI] = useState<string>('')
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState<boolean>(false);
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [eligibilityDetails, setEligibilityDetails] = useState<any>({});
  const [totalLandSize, setTotalLandSize] = useState<number>(0);
  const [averageSlope, setAverageSlope] = useState<number>(0);
  const [cropType, setCropType] = useState<string>("");
  const [landSuitabilityClass, setLandSuitabilityClass] = useState<string>("");
  const [nonSuitableArea, setNonSuitableArea] = useState<number>(0);
  const [notEligibleMessage, setNotEligibleMessage] = useState<string>("");
  const [reloadButton, setReloadButton] = useState<boolean>(false);

  const [men, setMen] = useState(140);
  const [women, setWomen] = useState(83);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [doughnutData1, setDoughnutData1] = useState({});
  const [doughnutOptions1, setDoughnutOptions1] = useState({});
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreditScoreLoading, setIsCreditScoreLoading] = useState<boolean>(false);
  const [collateralValue, setCollateralValue] = useState<number[]>([]);

  const breakdown = creditScoreData[0]?.breakdown;
  const kycDetails = creditScoreData[0]?.detailedBreakdown.kyc;
  const landDetails = creditScoreData[0]?.detailedBreakdown.land;
  const socialLand = creditScoreData[0]?.detailedBreakdown.social;
  const financialDetails = creditScoreData[0]?.detailedBreakdown.financial;
  
  const KYC = [
    {
      title: "Bounced Cheque",
      percentage: kycDetails ? kycDetails?.crbLoanClassification.score : 0,
    },
    {
      title: "Gender",
      percentage: kycDetails ? kycDetails?.gender.score : 0,
    },
    {
      title: "Marital Status",
      percentage: kycDetails ? kycDetails?.maritalStatus.score : 0,
    },
    {
      title: "Size of the  Business",
      percentage: kycDetails ? kycDetails?.businessSize.score : 0,
    },
    {
      title: "Farming Experience",
      percentage: kycDetails ? kycDetails?.farmingExperience.score : 0,
    },
    {
      title: "Number of Loans",
      percentage: kycDetails ? kycDetails?.numberOfLoans.score : 0,
    },
  ];

  const LAND = [
    {
      title: "Land to be cultivated",
      percentage: landDetails ? landDetails?.landSize.score : 0,
    },
    {
      title: "Natural/Climate Risk",
      percentage: landDetails ? landDetails?.naturalClimateRisk.score : 0,
    },
    {
      title: "Land Suitability",
      percentage: landDetails ? landDetails?.agriculturalSuitability.score : 0,
    },
  ];
  const social = [
    {
      title: "Job Creation",
      percentage: socialLand ? socialLand?.labourCreated.score : 0,
    },
  ];

  const FINANCIAL = [
    {
      title: "Dept Service Coverage",
      percentage: financialDetails ? financialDetails?.dscr.score : 0,
    },
    {
      title: "Net Profit Margin",
      percentage: financialDetails ? financialDetails?.netProfitMargin.score : 0,
    },
    {
      title: "Savings/Dept",
      percentage: financialDetails ? financialDetails?.savingsToDebtRatio.score : 0,
    },
    {
      title: "Collateral Coverage",
      percentage: financialDetails ? financialDetails?.collateralCoverage.score : 0,
    },
    {
      title: "Land Leased (No)",
      percentage: financialDetails ? financialDetails?.landLeased.score : 0,
    },
  ];

  const CircularProgress = () => {
    const scoreRaw = creditScoreData?.[0]?.totalScore;

  // Validate that score is a number between 0 and 100
    const score = typeof scoreRaw === 'number' && isFinite(scoreRaw) && scoreRaw >= 0 && scoreRaw <= 100
      ? scoreRaw
      : 0;
    const circleSize = 95;
    const strokeWidth = 8;
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;

    return (
      <div
        style={{
          background: "#e8f2eb",
          padding: "10px",
          borderRadius: "10px",
          width: "14rem",
          height: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "15px", marginBottom: "5px", color: "#7d8a84" }}>
          Total Scores
        </p>
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          {/* Background Circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#ddd"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="#0d5234"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#0d5234",
            marginTop: "2rem",
          }}
        >
          {score}%
        </span>
      </div>
    );
  };

  useEffect(() => {
    getSingleApplication();
    setIsCreditScoreLoading(true);
    setCreditScoreData([]);
  }, []);

  useEffect(() => {
    if (nationID) {
      getApplicationEligibility(nationID);
    }
  }, [nationID]);

  useEffect(() => {
    if (applicantId) {
      getCreditScore(applicantId);
    }else {
      setIsCreditScoreLoading(false);
    }
  }, [applicantId]);

  const getSingleApplication = async () => {
    try {
      const res = await sendRequest({
        reqType: "get",
        url: `application/${id}/application-details/any`,
      });
      if (res.data) {
        setSingleApplication(res.data);
        setNationID(res.data.applicant.nationalId);
        setApplicationStatus(res.data.status);
        setSimulationId(res.data.simulationId)
        setLandUPI(res.data.upi);
        setCollateralValue(res.data.collaterals.map((item: any) => Number(removeComma(item.value))))
        setApplicantType(res.data.applicationType);
        setFarmingExpirience(res.data.applicationDetails.find(
          (item: any) => item.fieldKey.trim() === "Farming Experience (Years)"
        )?.fieldValue || "0")
      }
    } catch (error) {
      console.error("Single application error:", error);
    }
  };

  const getApplicationEligibility = async (nationalId: any) => {
    try {
      setIsCreditScoreLoading(true);
      const res = await sendRequest({
        reqType: "post",
        url: `creditscore/eligibility/evaluate`,
        data: {
          nationalId: String(nationalId),
          applicantType: String(applicantType),
          facility: "Farming",
          valueChain: "Maize",
          landOwnership: "Owned",
        },
      });
      if (res.statusCode === 200) {
        setIsEligible(res.data.eligible);
        setEligibilityDetails(res.data.fieldEligibility);
        setApplicationId(res.data.applicationId)

      } else if (res.statusCode === 404) {
        setNotEligibleMessage(res.message);
      } else {
        console.error("Unexpected response:", res);
        setIsCreditScoreLoading(false);
      } 
    } catch (error) {
      console.error("Application eligibility error:", error);
      setNotEligibleMessage("Something went wrong. Please try again.");
      // setReloadButton(true);
    } finally {
      setIsCreditScoreLoading(false);
    }
  };

  const getCreditScore = async (applicationId: any) => {
    try {
      setIsCreditScoreLoading(true);
      const res = await sendRequest({
        reqType: "post",
        url: `creditscore/calculate`,
        data: {
          nationalId: String(nationID),
          applicationId: String(applicationId),
          upi: String(landUPI),
          // upi: "5/07/02/05/4033",
          collateralAmounts: collateralValue,
          simulationId: Number(simulationId),
          kyc: {
            farmingExperience: Number(farmingExpirience),
            businessSize: "Micro",
          },
        },
      });
      if (res.statusCode === 200) {
        setCreditScoreData([res.data]);
        setTotalLandSize(res.data.land.totalLandSize);
        setAverageSlope(res.data.land.averageSlope);
        setCropType(res.data.land.cropType);
        setLandSuitabilityClass(res.data.land.landSuitabilityClass);
        setNonSuitableArea(res.data.land.nonSuitableArea);

      } else if (res.statusCode === 403) {
        setNotEligibleMessage(res.message);
      } else {
        console.error("Unexpected response:", res);
        setNotEligibleMessage("Something went wrong. Please try again.");
        setReloadButton(true);
        setIsCreditScoreLoading(false);
      }
    } catch (error) {
      console.error("Credit scoring error:", error);
      setNotEligibleMessage("Something went wrong. Please try again.");
      setReloadButton(true);
    } finally {
      setIsCreditScoreLoading(false);
    }
  };

  const APPLICATION = [
    {
      title: "Loan Amount",
      percentage: `FRW ${singleApplication?.totalLoanAmount?.toLocaleString() ?? `N/A`}`,
    },
    {
      title: "Rep. Period",
      percentage: `${singleApplication?.loanPeriod ?? `N/A`} Months`,
    },
    {
      title: "Interest Rate",
      percentage: `${singleApplication?.averageInterestRate ?? `N/A`} %`,
    },
    {
      title: "Crops to be planted",
      percentage: "Maize",
    },
  ];

  const getHeaderRepayment = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-content-between items-center w-full">
        <p className="text-lg md:text-xl font-semibold">Repayments</p>
        <IconField iconPosition="right" className="w-full sm:w-auto">
          <InputText
            type="search"
            placeholder=" Search"
            className="w-full sm:w-60 md:w-80 p-2"
          />
          {/* <InputIcon className="pi pi-search" /> */}
        </IconField>
      </div>
    );
  };
  let headerRepayment = getHeaderRepayment();
  const getHeaderDibursement = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-content-between items-center w-full">
        <p className="text-lg md:text-xl font-semibold">Dibursement</p>
        <IconField iconPosition="right" className="w-full sm:w-auto">
          <InputText
            type="search"
            placeholder=" Search"
            className="w-full sm:w-60 md:w-80 p-2"
          />
          {/* <InputIcon className="pi pi-search" /> */}
        </IconField>
      </div>
    );
  };
  let headerDibursement = getHeaderDibursement();

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const rawValues = [landSuitabilityClass];
    const data = {
      labels: [cropType],
      datasets: [
        {
          label: "Land Suitability",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          data: rawValues
        },
      ],
    };
    const options = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend:
          { position: "right" }
      },
      scales: {
        x: {
          // display: false,
          type: "category",
          labels: ["N2", "N1", "S3", "S2", "S1"],
        },
      },
      aspectRatio: 0.8,
    };
    setChartData(data);
    setChartOptions(options);
  }, [creditScoreData]);

  const statusApproval = (rowData: any) => {
    const baseClass = " text-sm font-semibold p-1 rounded flex justify-content-center";
    switch (rowData) {
      case approvalStatus.pending:
        return <span style={{ width: '7rem' }} className={`${baseClass} bg-yellow-200 text-orange-900 border-round p-2 rounded flex justify-content-center`}>Pending</span>;
      case approvalStatus.approved:
        return <span style={{ width: '7rem' }} className={`${baseClass} bg-green-200 text-green-900 border-round p-2 rounded flex justify-content-center`}>Approved</span>;
      case approvalStatus.rejected:
        return <span style={{ width: '7rem' }} className={`${baseClass} bg-red-200 text-red-900 border-round p-2 rounded flex justify-content-center`}>Rejected</span>;
      default:
        return <span style={{ width: '7rem' }} className={`${baseClass} bg-gray-100 text-gray-700 border-round p-2 rounded flex justify-content-center`}>{rowData}</span>;
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    const statusClass = classNames({
      "bg-yellow-200 text-orange-900 border-round border-x-1 border-orange-600":
        rowData.status === "Pending",
      "bg-green-200 text-green-900 border-round border-x-1 border-green-600":
        rowData.status === "Paid",
      "bg-red-200 text-red-900 border-round border-x-1 border-red-600":
        rowData.status === "Not Paid",
    });

    return (
      <div
        style={{ width: "7rem" }}
        className={`p-1 rounded flex justify-content-center ${statusClass}`}
      >
        {rowData.status}
      </div>
    );
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Suitable Land for Cultivation", "Unsuitable Land"],
      datasets: [{ data: [totalLandSize, nonSuitableArea], backgroundColor: ["#0C8A00", "#03A9F4"] }],
    };
    const options = {
      cutout: "50%",
      indexAxis: "y",
    };

    setDoughnutData1(data);
    setDoughnutOptions1(options);
  }, [creditScoreData]);

  const iconList = icons.map((item) => (
    <div
      key={item.id}
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          objectFit: "cover",
          backgroundColor: "#8AC24133",
        }}
      >
        <i
          className={item.icon}
          style={{ fontSize: "1rem", fontWeight: "bold", color: "#056333" }}
        ></i>
      </div>
      <div>{item.name}</div>
    </div>
  ));
  return (
    <>
      <Toast ref={toast} />
      <div className="md:px-6 ">
        {/* Risk , Recommendation, and Approval */}
        <div className="md:flex w-full justify-content-between  mt-5 gap-3">
          <div
            style={{ borderRadius: "0.5rem" }}
            className=" md:flex gap-2 w-full bg-white justify-content-between align-items-center py-2 px-4"
          >
            {creditScoreData[0]?.totalScore > 0 ? (
              <>
                <div className="flex flex-column gap-3 justify-content-between">
                  <span className="text-lg font-bold text-green-900">
                    Risk , Recommendation, and Approval
                  </span>
                  <div className="flex flex-col justify-content-between gap-0 items-center w-full">
                    <span className="text-lg font-medium">Risk Level</span>
                    {creditScoreData && !isCreditScoreLoading && (
                      <span
                        style={{ borderRadius: "0.5rem", width: "7rem" }}
                        className={`p-2 flex justify-content-center text-md
                      ${creditScoreData[0]?.riskLevel === 'Low' ? 'bg-green-100 text-green-900' : ''}
                      ${creditScoreData[0]?.riskLevel === 'Moderate' ? 'bg-orange-100 text-orange-900' : ''}
                      ${creditScoreData[0]?.riskLevel === 'High' ? 'bg-red-100 text-red-900' : ''}
                    `}
                      >
                        {creditScoreData[0]?.riskLevel}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-content-between gap-4 items-center">
                    <span className="text-lg font-medium">Recommendation</span>
                    {creditScoreData && !isCreditScoreLoading && (
                      <span
                        style={{ borderRadius: "0.5rem", width: "7rem" }}
                        className={`p-2 flex justify-content-center text-md
                      ${creditScoreData[0]?.recommendation === true ? 'bg-green-100 text-green-900' : ''}
                      ${creditScoreData[0]?.recommendation === false ? 'bg-red-100 text-red-900' : ''}
                    `}
                      >
                        {creditScoreData[0]?.recommendation === true ? 'Approval' : ''}
                        {creditScoreData[0]?.recommendation === false ? 'rejection' : ''}
                      </span>
                    )}
                  </div>
                </div>

              </>
            ) : (
              <>

                {isCreditScoreLoading ? (
                  <Skeleton
                    width="18rem"
                    height="5rem"
                    className=" flex justify-content-center text-md"
                  />
                ) : (
                  <div
                    style={{
                      borderLeft: '6px solid #FAAD14',
                      backgroundColor: '#FFFBE6',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      minHeight: '5rem',
                    }}
                    className="flex flex-col justify-between text-yellow-800 font-medium"
                  >
                    <span className="text-sm md:text-base">{notEligibleMessage}</span>

                    {reloadButton && (
                      <div className="flex mt-3">
                        <Button
                          icon="pi pi-refresh"
                          rounded
                          outlined
                          severity="warning"
                          aria-label="Retry"
                          onClick={() => {
                            getCreditScore(applicantId)
                            setReloadButton(false);
                          }}
                          tooltip="Retry"
                        />
                      </div>
                    )}
                  </div>
                )}
                
              </>
            )}
            <div className="flex flex-column gap-3 md:w-5 w-full items-center md:p-4 md:border-x-1 border-gray-300 mt-3">
              <div className="flex w-full  gap-4 justify-content-between ">
                <span className="text-lg font-medium">Approval Status</span>
                {statusApproval(applicationStatus)}
              </div>

              <div className="flex w-full  gap-4  justify-content-between">
                <span className="text-lg font-medium">Eligibility</span>
                {/* {!isEligible ? (
                        <Skeleton
                          width="7rem"
                          height="2.5rem"
                          className="p-2 flex justify-content-center text-md"
                        />
                      ):( */}
                <span
                  style={{
                    borderRadius: "0.5rem",
                    width: "7rem",
                    backgroundColor: isEligible ? "#007A3C17" : "#EF44442B",
                    color: isEligible ? "#348352" : "#EF4444",
                  }}
                  className=" p-2  flex justify-content-center text-sm font-semibold cursor-pointer"
                  onClick={() => setIsEligibilityModalOpen(true)}
                >
                  {isEligible ? "Eligible" : "Not Eligible"}
                </span>
                {/* )} */}

              </div>
            </div>
            {creditScoreData && !isCreditScoreLoading && (
              <div className="md:mt-0 mt-4 flex ">{CircularProgress()}</div>
            )}
            {isCreditScoreLoading && (
              <Skeleton
                width="14rem"
                height="8rem"
                className=" flex justify-content-center md:mt-0 mt-4"
              />
            )}
          </div>
          {/* Validate */}
          <div
            style={{ borderRadius: "0.5rem" }}
            className="w-full md:w-3 p-3 bg-white gap-3 flex flex-column md:mt-0 mt-4"
          >
            <div className="flex justify-content-between gap-2  w-full">
              <div
                style={{
                  borderRadius: "0.5rem",
                  color: isValidated ? "#056333" : "red",
                  backgroundColor: isValidated ? "#0563332B" : "#EF44442B",
                }}
                className="flex align-items-center w-full gap-2 p-2 font-bold"
              >
                {isValidated ? (
                  <span className="text-center">Validated</span>
                ) : (
                  <span className="text-center">Not Validated</span>
                )}
              </div>
              <div
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: isValidated ? "#0563332B" : "#EF44442B",
                }}
                className="flex align-items-center p-3 font-bold text-purple-900"
              >
                {isValidated ? (
                  <Image src="/checked.png" alt="logo" width={12} height={12} />
                ) : (
                  <Image
                    src="/unvalidated.png"
                    alt="logo"
                    width={15}
                    height={15}
                  />
                )}
              </div>
            </div>
            <div className="p-2 text-center">
              {isValidated ? (
                <span>Application has been validated through ESRI</span>
              ) : (
                <Button
                  label="Validate"
                  icon="pi pi-refresh"
                  severity="secondary"
                  outlined
                  color="black"
                />
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-3  grid grid-cols-2 sm:grid-cols-2 justify-content-between lg:grid-cols-2 gap-3 ">
          {/* Contact Card */}
          <div className="w-full lg:w-3 ">
            <div
              style={{ borderRadius: "0.5rem" }}
              className="bg-white shadow-md rounded-xl p-3 w-full "
            >
              <div className="flex items-center">
                <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                <div className="flex flex-column ml-3">
                  <span className="text-lg font-bold">
                    {singleApplication?.applicant?.fullName ?? "N/A"}
                  </span>
                  <span className="text-md ">Farmer</span>
                  <span className="text-md ">
                    {singleApplication?.applicant?.email ?? "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex justify-content-around gap-2 md:gap-1 mt-4">
                {iconList}
              </div>
            </div>
            <div
              style={{ borderRadius: "0.5rem" }}
              className="bg-white mt-4 p-5 flex flex-column"
            >
              <div className="flex justify-content-center">
                <h3 className="text-xlg font-bold text-green-900">
                  Additional Details
                </h3>
              </div>
              <span className="font-bold ">National ID</span>
              <span>
                {singleApplication?.applicant?.nationalId ?? "N/A"}
              </span>
              <span className="font-bold mt-4">Phone number</span>
              <span>{singleApplication?.applicant?.phone ?? "N/A"}</span>
              <span className="font-bold mt-4">Bank Name</span>
              <span>{singleApplication?.bankClassification ?? "N/A"}</span>
              <span className="font-bold mt-4">Account Number</span>
              <span>
                {singleApplication?.accountNumber ?? "N/A"}
              </span>
              <span className="font-bold mt-4">Account Owner</span>
              <span>
                {singleApplication?.accountName ?? "N/A"}
              </span>
              
              
            </div>
          </div>

          {/* Credit Score Card */}

          {creditScoreData && !isCreditScoreLoading && (
            <div
              style={{ borderRadius: "0.5rem" }}
              className="bg-white shadow-md rounded-xl p-3 w-full md:w-4"
            >
              {/* KYC -------> */}
              <div>
                <div className="flex justify-content-between gap-4 ">
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-green-100 w-full  gap-2 py-3 px-3 font-bold text-green-900"
                  >
                    <Image src="/KYC.png" alt="logo" width={16} height={20} />
                    KYC
                  </div>
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-green-100 p-2 px-3 font-bold text-green-900"
                  >
                    {breakdown ? breakdown?.kycScore : 0}%
                  </div>
                </div>
                <div className="p-3">
                  {KYC.map((category, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-content-between py-1"
                      >
                        <span>{category.title}</span>
                        <span>{category.percentage} %</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LAnd -------> */}
              <div>
                <div className="flex justify-content-between gap-4 ">
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-cente bg-Youth: 7 | Adult: 6Youth: 7 | Adult: 6-100 w-full gap-2 py-3 px-3 font-bold bg-yellow-100 text-orange-400"
                  >
                    <Image src="/land.png" alt="logo" width={20} height={20} />
                    LAND
                  </div>
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-yellow-100 p-2 px-3 font-bold text-orange-400"
                  >
                    {breakdown ? breakdown?.landScore : 0}%
                  </div>
                </div>
                <div className="p-3">
                  {LAND.map((category, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-content-between py-1"
                      >
                        <span>{category.title}</span>
                        <span>{category.percentage} %</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Impact */}

              <div>
                <div className="flex justify-content-between gap-4 ">
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-cente bg-blue-100 w-full  gap-2 py-3 px-3 font-bold text-blue-400"
                  >
                    <Image src="/social.png" alt="logo" width={20} height={20} />
                    Social Impact
                  </div>
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-blue-100 p-2 px-3 font-bold text-blue-400"
                  >
                    {breakdown ? breakdown?.socialScore : 0}%
                  </div>
                </div>
                <div className="p-3">
                  {social.map((category, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-content-between py-1"
                      >
                        <span>{category.title}</span>
                        <span>{category.percentage} %</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {isCreditScoreLoading && (
            <div
              style={{ borderRadius: "0.5rem" }}
              className="bg-white shadow-md rounded-xl p-3 w-full md:w-4"
            >
              <Skeleton width="100%" height="40px" className="mb-2" />
              <Skeleton width="100%" height="150px" className="mb-2" />
              <Skeleton width="100%" height="40px" className="mb-2" />
              <Skeleton width="100%" height="150px" className="mb-2" />
              <Skeleton width="100%" height="40px" className="mb-2" />
              <Skeleton width="100%" height="40px" className="mb-2" />
            </div>
          )}

          {/* Loan Info Card */}
          <div
            style={{ borderRadius: "0.5rem" }}
            className="bg-white shadow-md rounded-xl p-3 w-full md:w-4"
          >
            {/* FINANCIAL -------> */}
            {!isCreditScoreLoading && creditScoreData && (
              <div>
                <div className="flex justify-content-between gap-4 ">
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-purple-100 w-full  gap-2 py-3 px-3 font-bold text-purple-900"
                  >
                    <i
                      className="pi pi-chart-line"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    FINANCIAL
                  </div>
                  <div
                    style={{ borderRadius: "0.5rem" }}
                    className="flex align-items-center bg-purple-100 p-2 px-3 font-bold text-purple-900"
                  >
                    {breakdown ? breakdown?.financialScore : 0}%
                  </div>
                </div>
                <div className="p-3">
                  {FINANCIAL.map((category, index) => (
                    <div key={index}>
                      <div
                        key={index}
                        className="flex justify-content-between py-1"
                      >
                        <span>{category.title}</span>
                        <span>{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isCreditScoreLoading && (
              <div>
                <Skeleton width="100%" height="40px" className="mb-2" />
                <Skeleton width="100%" height="150px" className="mb-2" />
              </div>
            )}

            {/* APPLICATION */}
            <div>
              <div className="flex justify-content-between gap-4 ">
                <div
                  style={{ borderRadius: "0.5rem" }}
                  className="flex align-items-center bg-gray-300 w-full  gap-2 py-3 px-3 font-bold text-black-900"
                >
                  <i
                    className="pi pi-th-large"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  APPLICATION
                </div>
              </div>
              <div className="p-3">
                {APPLICATION.map((category, index) => (
                  <div key={index}>
                    <div
                      key={index}
                      className="flex justify-content-between py-1"
                    >
                      <span
                        className={
                          index === 0 || index === APPLICATION.length - 1
                            ? "font-bold"
                            : ""
                        }
                      >
                        {category.title}
                      </span>
                      <span
                        className={
                          index === 0 || index === APPLICATION.length - 1
                            ? "font-bold"
                            : ""
                        }
                      >
                        {category.percentage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className=" mt-2 flex justify-content-center underline p-2 text-lg text-green-900 font-bold  cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                View More Info
              </div>
            </div>
          </div>
        </div>
        {applicantType === "Business" && (
          <div className="bg-white mt-3 p-5" style={{ borderRadius: "0.5rem" }}>
            {/* Title */}
            <div className=" flex  ">
              <h3 className="text-lg font-bold text-green-900">
                Shareholders Info
              </h3>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 justify-content-between">
              <div
                className="flex flex-column items-center gap-3 justify-center bg-white p-5"
                style={{
                  width: "18rem",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsShareHolderOpen(true);
                }}
              >
                <span className="text-gray-600">Total Shareholders</span>
                <div className="flex align-items-center gap-2 text-2xl font-semibold">
                  <span
                    style={{ borderRadius: "0.5rem" }}
                    className="bg-purple-100 px-3 py-2 text-purple-700"
                  >
                    <i
                      className="pi pi-address-book"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </span>
                  <span>25</span>
                </div>
                <p className="text-sm text-gray-500">Men: 12 | Women: 13</p>
              </div>

              {/* Second Card -------- */}

              <div
                className="flex flex-column items-center gap-3 justify-center bg-white p-5 rounded-2xl shadow-md"
                style={{
                  width: "18rem",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span className="text-gray-600">Young Men</span>
                <div className="flex align-items-center gap-2 text-2xl font-semibold">
                  <span
                    style={{ borderRadius: "0.5rem" }}
                    className="bg-blue-100 px-3 py-2 text-blue-500"
                  >
                    <i className="pi pi-mars" style={{ fontSize: "1.5rem" }}></i>
                  </span>
                  <span>13</span>
                </div>
                <p className="text-sm text-gray-500">Adult: 6</p>
              </div>

              {/* Third Card */}

              <div
                className="flex flex-column items-center gap-3 justify-center bg-white p-5 rounded-2xl shadow-md"
                style={{
                  width: "20rem",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span className="text-gray-600">Young Women</span>
                <div className="flex align-items-center gap-2 text-2xl font-semibold">
                  <span
                    style={{ borderRadius: "0.5rem" }}
                    className="bg-orange-100 px-3 py-2 text-red-300"
                  >
                    <i className="pi pi-venus" style={{ fontSize: "1.5rem" }}></i>
                  </span>
                  <span>12</span>
                </div>
                <p className="text-sm text-gray-500"> Adult: 6</p>
              </div>

              {/* Fourth Card */}

              <div
                className="flex flex-column items-center gap-3 justify-center bg-white p-5"
                style={{
                  width: "18rem",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <span className="text-gray-600">Total Youth</span>
                <div className="flex align-items-center gap-2 text-2xl font-semibold">
                  <span>
                    <Image src="/Icon2.png" alt="logo" width={40} height={40} />
                  </span>
                  <span>6</span>
                </div>
                <p className="text-sm text-gray-500">Age:24-35</p>
              </div>
            </div>
          </div>
        )}

        {/* Geographic Data Insights */}
        <div className="bg-white mt-3 p-5" style={{ borderRadius: "0.5rem" }}>
          {/* Title */}
          <div className=" flex  ">
            <h3 className="text-lg font-bold text-green-900">
              Geographic Data Insights
            </h3>
          </div>

          {/* Suitability Per Crop */}

          <div className=" grid grid-cols-1 md:grid-cols-2 justify-content-between gap-4 p-4">
            <div className="w-full md:w-6 h-80">
              <h4 className="text-center text-lg font-semibold">
                Crops Per Suitabilty
              </h4>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
            <div className="gap-4 w-full p-3 md:w-5 md: ">
              {/* Land Use */}
              <div className="p-1 md:flex flex-row justify-content-between">
                <div className="w-full">
                  <h4 className="text-center text-lg font-semibold">Land Use</h4>
                  <Chart
                    type="doughnut"
                    data={doughnutData1}
                    options={doughnutOptions1}
                    className="w-full md:w-15rem"
                  />
                </div>
                <div className=" w-full flex flex-column align-items-center">
                  <h4 className="text-center text-lg font-semibold">
                    Soil Depth
                  </h4>
                  <span className="text-5xl">⛰</span>
                  <span className="text-3xl font-bold mt-2">{averageSlope}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ShareHolders Info Modal */}
        <Dialog
          header=""
          visible={isShareHolderOpen}
          onHide={() => {
            setIsShareHolderOpen(false);
          }}
          className="md:w-4 w-full"
        >
          <div className="flex-col justi p-5  shadow-md ">
            <h2 className="text-green-800 font-semibold text-lg mb-4">
              Update Shareholders Info
            </h2>
            <div
              style={{ border: "1px solid gray", borderRadius: "0.5rem" }}
              className="p-5 flex flex-column justify-content-center items-center w-full"
            >
              <div className="flex align-items-center gap-3 w-full ">
                <i className="pi pi-mars" style={{ fontSize: "2rem" }}></i>
                <div className="flex-auto">
                  <label htmlFor="men-buttons" className="block mb-2">
                    Men
                  </label>
                  <InputNumber
                    value={men}
                    onValueChange={(e) => setMen(e.value ?? 0)}
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClassName="p-button-outlined p-button-secondary"
                    incrementButtonClassName="p-button-outlined p-button-secondary"
                    style={{ width: "8rem" }}
                  />
                </div>
              </div>
              <div className="flex align-items-center gap-3 w-full ">
                <i className="pi pi-venus" style={{ fontSize: "2rem" }}></i>
                <div className="flex-auto">
                  <label htmlFor="women-buttons" className="block mb-2">
                    Women
                  </label>
                  <InputNumber
                    value={women}
                    onValueChange={(e) => setWomen(e.value ?? 0)}
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClassName="p-button-outlined p-button-secondary"
                    incrementButtonClassName="p-button-outlined p-button-secondary"
                    style={{ width: "8rem" }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-content-center mt-4">
              <Button
                label="Update"
                className="p-button-success w-4 "
                onClick={() => {
                  setIsShareHolderOpen(false);
                }}
              />
            </div>
          </div>
        </Dialog>
        {/* Application Modal */}
        <Sidebar
          visible={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          position="right"
          // style={{ width: "45rem" }}
          className="w-full md:w-5"
        >
          <div className="w-full" style={{ background: "#F3FAFD" }}>
            {/* Header */}
            <div className="flex justify-content-between p-4  items-center bg-white mb-4 ">
              <div className="flex items-center gap-4">
                <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                <div className="flex flex-column ">
                  <span className="text-lg font-bold">
                    {singleApplication?.applicant?.fullName ?? "N/A"}
                  </span>
                  <p className="text-gray-500">11 Jan 2023</p>
                </div>
              </div>
              <div className="flex flex-column gap-1">
                <span>Approval Status</span>{" "}
                {statusApproval(applicationStatus)}
                {/* <Tag value="Apending" severity="success" /> */}
              </div>
            </div>

            {/* Totals */}

            <div className="grid grid-cols-2 justify-content-between mb-2 px-3 p-1 gap-1">
              <div
                className="bg-white p-5 rounded shadow text-center md:w-5 w-full"
                style={{ borderRadius: "0.5rem" }}
              >
                <div className="flex align-items-center justify-content-center gap-3">
                  <Image
                    src="/TotalDisbur.png"
                    alt="logo"
                    width={30}
                    height={30}
                  />{" "}
                  <span>Total Disbursement</span>
                </div>
                <p className="text-2xl font-bold">RWF 38,450,904</p>
              </div>
              <div
                className="bg-white p-5 rounded-x-1 shadow text-center md:w-5 w-full"
                style={{ borderRadius: "0.5rem" }}
              >
                <div className="flex align-items-center justify-content-center gap-3">
                  <Image
                    src="/TotalRepay.png"
                    alt="logo"
                    width={30}
                    height={30}
                  />{" "}
                  <span>Total Repayment</span>
                </div>
                <p className="text-2xl font-bold">RWF 25,240,000</p>
              </div>
            </div>

          {/* Dibursement Table  */}

            <div
              style={{
                marginTop: "10px",
                // width: "100%",
                backgroundColor: "white",
                border: "1px solid #E3E8F0",
                borderRadius: "0.7rem",
                height: "auto",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
              className=" px-3 "
            >
              <div className="w-full ">
                <DataTable
                  value={disbursements}
                  header={headerDibursement}
                  tableStyle={{ borderRadius: "2rem" }}
                  paginator
                  rows={10}
                  dataKey="id"
                // onRowClick={nameBodyTemplate}
                // onRowClick={handleRowClick}
                >
                  <Column
                    selectionMode="multiple"
                  // headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column field="no" header="No." sortable></Column>
                  <Column field="amount" header="Amount" sortable></Column>
                  <Column field="date" header="Date"></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  ></Column>
                </DataTable>
              </div>
            </div>

          {/* Total Repayment */}

            <div
              style={{
                marginTop: "10px",
                // width: "100%",
                backgroundColor: "white",
                border: "1px solid #E3E8F0",
                borderRadius: "0.7rem",
                height: "auto",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="w-full">
                <DataTable
                  value={repayment}
                  header={headerRepayment}
                  tableStyle={{ borderRadius: "2rem" }}
                  paginator
                  rows={10}
                  dataKey="id"
                // onRowClick={nameBodyTemplate}
                // onRowClick={handleRowClick}
                >
                  <Column
                    selectionMode="multiple"
                  // headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column field="no" header="No." sortable></Column>
                  <Column field="amount" header="Amount" sortable></Column>
                  <Column field="date" header="Date"></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Eligibility */}
        <Dialog
          header={
            <div>
              <span>Eligibility Details </span>
            </div>
          }
          visible={isEligibilityModalOpen}
          onHide={() => setIsEligibilityModalOpen(false)}
          style={{ width: "45rem" }}
        > 
          { eligibilityDetails && Object.keys(eligibilityDetails).length > 0  ?  (
            <div className="surface-section border-round p-4">
              <div className="grid">
                {Object.entries(eligibilityDetails).map(([key, value]) => {
                  const item = value as EligibilityItem;
                  return (
                    <div key={key} className="col-12 md:col-6 mb-3">
                      <div className="surface-card p-4 border-round shadow-1 h-full">
                        <label className="flex justify-content-between block text-600 mb-2">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (c) => c.toUpperCase())}
                          {item.eligible ? (
                            <Image
                              src="/checked.png"
                              alt="logo"
                              width={12}
                              height={12}
                            />
                          ) : (
                            <Image
                              src="/unvalidated.png"
                              alt="logo"
                              width={15}
                              height={15}
                            />
                          )}
                        </label>
                        <div className="text-900 text-lg">{item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ): (
            <div className="flex justify-content-center">
              No data
            </div>
          )}
          
        </Dialog>
      </div>
    </>
  );
}
