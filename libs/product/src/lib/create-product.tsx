import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';

import { Product } from '../types';
import { api } from '../utils';

export function CreateProduct(): JSX.Element {
  const router = useRouter();
  const toast = useRef<any>(null);
  const [error, setError] = useState<any>();

  const createDefaultValues = (isAmountBasedOnFrequency: boolean) => {
    const baseDefaultValues = {
      name: '',
      description: '',
      disbursementFrequency: 'Once',
      disbursementFrequencyLimit: 0,
      isAmountBasedOnFrequency: true,
      minimumAmount: 0,
      currency: 'RWF',
      interestRate: 0,
      hasGrant: false,
      grantPercentage: 0,
      type: 'Cash',
      isMandatory: true,
      canVary: false,
      repaymentPeriod: 0,
      hasGracePeriod: false,
      gracePeriodType: 'Month',
      gracePeriodDuration: 0,
      unitPrice: 0,
      repaymentType: 'Monthly',
    };
  
    return {
      ...baseDefaultValues,
      ...(isAmountBasedOnFrequency === false ? { ceilingAmount: 0 } : {}),
    };
  };

  const defaultValues = createDefaultValues(true);
  const { control, handleSubmit, watch } = useForm({ defaultValues });
  const disbursementFrequency = watch('disbursementFrequency');

  const showError = (error: string) => {
    if (toast && toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 10000,
      });
    }
  };

  useEffect(() => {
    if (error) {
      showError(error?.response?.data?.message.toString() || '');
    }
  }, [error]);

  const onSubmit = (data: Product) => {
    if (!data?.hasGrant) {
      delete data.grantPercentage;
    }

    if (data?.isAmountBasedOnFrequency) {
      delete data.maximumAmount;
    }

    if (!data?.hasGracePeriod) {
      delete data?.gracePeriodDuration;
      delete data?.gracePeriodType;
    }

    if (data.disbursementFrequency !== 'Custom') {
      delete data.disbursementFrequencyLimit;
    }

    api
      .post('/products', { ...data })
      .then(() => {
        router.push('/uno-admin/product/products');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div>
        <Toast ref={toast} />
        <div className="col-12 m-2 w-full px-8">
          <div className="card p-2">
            <h2 className="my-3">Create Product</h2>
            <form className="grid p-fluid" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 md:col-6">
                <label htmlFor="name">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required.' }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      placeholder="Enter product name"
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="description">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      placeholder="Enter product description"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="disbursementFrequency">
                  Disbursement Frequency
                </label>
                <Controller
                  name="disbursementFrequency"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Dropdown
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      placeholder="Select disbursement frequency"
                      options={['Once', 'Monthly', 'Quarterly', 'Custom']}
                    />
                  )}
                />
              </div>
              {disbursementFrequency === 'Custom' && (
                <div className="col-12 md:col-6">
                  <label htmlFor="disbursementFrequencyLimit">
                    Disbursement Frequency Limit
                  </label>
                  <Controller
                    name="disbursementFrequencyLimit"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <InputNumber
                        id={name}
                        value={value}
                        onChange={(e) => onChange(e.value)}
                        placeholder="Enter disbursement frequency limit"
                      />
                    )}
                  />
                </div>
              )}
              <div className="col-12 md:col-6">
                <label>Range vs. Ceiling</label>
                <br />
                <Controller
                  name="isAmountBasedOnFrequency"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox
                      name={name}
                      checked={value}
                      tooltip="Toggle to display minimum and maximum values or ceiling amount only."
                      onChange={(e) => onChange(e.checked || false)}
                    />
                  )}
                />
              </div>
              {/* {watch('isAmountBasedOnFrequency') && (
                <> */}
                  <div className="col-12 md:col-6">
                    <label htmlFor="amount">Minimum Amount</label>
                    <Controller
                      name="minimumAmount"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <InputNumber
                          id={name}
                          onChange={(e) => onChange(e.value)}
                          mode="currency"
                          currency="RWF"
                          value={value}
                          locale="en-US"
                          placeholder="Enter ceiling amount"
                        />
                      )}
                    />
                  </div>
                {/* </>
              )} */}
              {!watch('isAmountBasedOnFrequency') && (
                <>
                  <div className="col-12 md:col-6">
                    <label htmlFor="ceilingAmount">Ceiling Amount</label>
                    <Controller
                      name="ceilingAmount"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <InputNumber
                          id={name}
                          onChange={(e) => onChange(e.value)}
                          mode="currency"
                          currency="RWF"
                          value={value}
                          locale="en-US"
                          placeholder="Enter ceiling amount"
                        />
                      )}
                    />
                  </div>
                  {/* <div className="col-12 md:col-6">
                    <label htmlFor="maximumAmount">Maximum Amount</label>
                    <Controller
                      name="maximumAmount"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <InputNumber
                          id={name}
                          onChange={(e) => onChange(e.value)}
                          mode="currency"
                          currency="RWF"
                          value={value}
                          locale="en-US"
                          placeholder="Enter ceiling amount"
                        />
                      )}
                    />
                  </div> */}
                </>
              )}
              <div className="col-12 md:col-6">
                    <label htmlFor="unitPrice">Unit Price</label>
                    <Controller
                      name="unitPrice"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <InputNumber
                          id={name}
                          onChange={(e) => onChange(e.value)}
                          mode="currency"
                          currency="RWF"
                          value={value}
                          locale="en-US"
                          placeholder="Enter Unit Price"
                        />
                      )}
                    />
                </div>
              <div className="col-12 md:col-6">
                <label htmlFor="currency">Currency</label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Dropdown
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      options={['RWF', 'USD', 'EUR']}
                      placeholder="Select currency"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="interestRate">Interest Rate</label>
                <Controller
                  name="interestRate"
                  control={control}
                  render={({ field: { name, onChange, ...rest } }) => (
                    <InputNumber
                      id={name}
                      onChange={(e) => onChange(e.value)}
                      {...rest}
                      mode="decimal"
                      placeholder="Enter interest rate"
                      suffix="%"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label>Product has grant</label>
                <br />
                <Controller
                  name="hasGrant"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Checkbox
                      id={name}
                      checked={value}
                      onChange={(e) => onChange(e.checked || false)}
                    />
                  )}
                />
              </div>
              {watch('hasGrant') && (
                <div className="col-12 md:col-6">
                  <label htmlFor="grantPercentage">Grant Percentage</label>
                  <Controller
                    name="grantPercentage"
                    control={control}
                    render={({ field: { name, onChange, ...rest } }) => (
                      <InputNumber
                        id={name}
                        onChange={(e) => onChange(e.value)}
                        {...rest}
                        mode="decimal"
                        placeholder="Enter grant percentage"
                        suffix="%"
                      />
                    )}
                  />
                </div>
              )}
              <div className="col-12 md:col-6">
                <label htmlFor="type">Type</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Dropdown
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      options={['Cash', 'Material']}
                      placeholder="Select type"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label>Can Vary</label>
                <br />
                <Controller
                  name="canVary"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox
                      name="name"
                      id={name}
                      checked={value}
                      onChange={(e) => onChange(e.checked || false)}
                    />
                  )}
                />
              </div>
              {/* <div className="col-12 md:col-6">
                <label htmlFor="repaymentPeriod">Repayment Period(Month)</label>
                <Controller
                  name="repaymentPeriod"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <InputNumber
                      id={name}
                      onChange={(e) => onChange(e.value)}
                      value={value}
                      locale="en-US"
                      placeholder="Enter repayment period"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="repaymentFrequency">
                  Repayment Frequency
                </label>
                <Controller
                  name="repaymentFrequency"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Dropdown
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      placeholder="Select repayment frequency"
                      options={['Bullet', 'Monthly', 'Quarterly']}
                    />
                  )}
                />
              </div> */}
              {/* <div className="col-12 md:col-6">
                <label htmlFor="repaymentIntervalMonths">
                  Repayment Frequency
                </label>
                <Controller
                  name="repaymentIntervalMonths"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <InputNumber
                      id={name}
                      onChange={(e) => onChange(e.value)}
                      value={value}
                      locale="en-US"
                      placeholder="Enter repayment period"
                    />
                  )}
                />
              </div> */}
              {/* <div className="col-12 md:col-6">
                <label>Has Grace Period</label>
                <br />
                <Controller
                  name="hasGracePeriod"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox
                      name="name"
                      id={name}
                      checked={value}
                      onChange={(e) => onChange(e.checked || false)}
                    />
                  )}
                />
              </div>
              {watch('hasGracePeriod') && (
                <>
                  <div className="col-12 md:col-6">
                    <label htmlFor="gracePeriodType">Grace Period Type</label>
                    <Controller
                      name="gracePeriodType"
                      control={control}
                      render={({ field: { name, value, onChange } }) => (
                        <Dropdown
                          id={name}
                          value={value}
                          onChange={(e) => onChange(e.value)}
                          options={['Month', 'Year']}
                          placeholder="Select grace period type"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label htmlFor="gracePeriodDuration">
                      Grace Period Duration
                    </label>
                    <Controller
                      name="gracePeriodDuration"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <InputNumber
                          id={name}
                          onChange={(e) => onChange(e.value)}
                          value={value}
                          locale="en-US"
                          placeholder="Enter grace period duration"
                        />
                      )}
                    />
                  </div>
                </>
              )} */}
              <div className="col-12 md:col-6">
                <label>Is Mandatory</label>
                <br />
                <Controller
                  name="isMandatory"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Checkbox
                      name="name"
                      id={name}
                      checked={value}
                      onChange={(e) => onChange(e.checked || false)}
                    />
                  )}
                />
              </div>
              <div className="mt-3 col-12">
                <Button label="Create" className="w-3" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
