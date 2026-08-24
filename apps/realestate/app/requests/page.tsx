import HeadingBar from "@/components/headingBar/headingBar";
import Layout from "@/components/layouts/sidebar";
import { columns } from "../../components/table/columns";
import { DataTable } from "../../components/table/data-table";
import TableTitleBar from "@/components/table/tableTitleBar";
import fetchRequests from "@/actions/fetchRequests";
import { unitStatus } from "../../lib/constants";

export default async function RequestsPage() {
  // Fetch the requests data
  const requestsList = await fetchRequests();
  // Filter requests by their status
  const pendingRequests = requestsList.filter(
    (request) =>
      request.status === unitStatus.PENDING ||
      request.status === unitStatus.REQUESTED_MORE_INFO
  );
  const approvedRequests = requestsList.filter(
    (request) => request.status === unitStatus.APPROVED
  );
  const rejectedRequests = requestsList.filter(
    (request) => request.status === unitStatus.REJECTED
  );

  return (
    <Layout>
      <div className="w-full h-full">
        <HeadingBar heading="Requests" />
        <div className="rounded-b-3xl border bg-white p-4">
          <div className="flex flex-col gap-12 bg-white p-11">
            <div>
              <TableTitleBar
                title={`Pending Requests(${pendingRequests.length})`}
                status="pending"
              />
              <DataTable columns={columns} data={pendingRequests} />
            </div>

            <div>
              <TableTitleBar
                title={`Approved Requests(${approvedRequests.length})`}
                status="approved"
              />
              <DataTable columns={columns} data={approvedRequests} />
            </div>

            <div>
              <TableTitleBar
                title={`Rejected Requests(${rejectedRequests.length})`}
                status="rejected"
              />
              <DataTable columns={columns} data={rejectedRequests} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
