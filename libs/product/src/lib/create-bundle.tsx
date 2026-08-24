import { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { api } from '../utils';
import { Checkbox } from 'primereact/checkbox';

interface Bundle {
  projectId: number | null;
  name: string;
  description: string;
  tag: string;
  ceilingAmount: number;
  loanPeriod: number;
  repaymentFrequency: string
  repaymentFrequencyLimit?: number
  hasGracePeriod: boolean,
  gracePeriodType: string,
  gracePeriodDuration: number
}

export function CreateBundle(): JSX.Element {
  const router = useRouter();
  const defaultValues = {
    projectId: null,
    name: '',
    description: '',
    tag: '',
    ceilingAmount: 0,
    loanPeriod: 0,
    repaymentFrequency: 'Bullet',
    repaymentFrequencyLimit: 0,
    hasGracePeriod: false,
    gracePeriodType: 'Month',
    gracePeriodDuration: 0,
  };

  const { control, handleSubmit, watch } = useForm({ defaultValues });
  const disbursementFrequency = watch('repaymentFrequency');
  const [error, setError] = useState<any>();
  const toast = useRef<any>(null);

  const onSubmit = (data: Bundle) => {
    // @ts-expect-error projectId is not a string
    data.projectId = parseInt(data.projectId.id);

    // if (data.repaymentFrequency !== 'Custom') {
    //   delete data.repaymentFrequencyLimit;
    // }

    api
      .post('/products/bundles', data)
      .then(() => {
        router.push('/uno-admin/product/bundles');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const showError = (error: string) => {
    if (toast && toast.current) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      });
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     showError(error?.response?.data?.message || '');
  //   }
  // }, [error]);

  return (
    <>
      <div>
        <Toast ref={toast} />
        <div className="col-12 m-2 w-full px-8">
          <div className="card p-2">
            <h1 className="py-4 text-4xl font-bold">Create Bundle</h1>
            <form className="grid p-fluid" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 md:col-6">
                <label htmlFor="disbursementFrequency">Project</label>
                <Controller
                  name="projectId"
                  control={control}
                  rules={{
                    required: 'Project is required',
                  }}
                  render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                    <>
                    <Dropdown
                      id={name}
                      value={value}
                      optionLabel="name"
                      onChange={(e) => onChange(e.value)}
                      placeholder="Select a Project"
                      options={[
                        { id: 1, name: 'Kataza' },
                        { id: 2, name: 'Minuza' },
                        { id: 3, name: 'Realestate' },
                      ]}
                      className={error ? 'p-invalid' : ''}
                      />
                    {error &&
                     <small className="p-error">
                      {error.message}</small>}
                    </>
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="description">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <InputText
                        id={field.name}
                        {...field}
                        placeholder="Enter Bundle Name"
                        className={error ? 'p-invalid' : ''}
                        />
                      {error && <small className="p-error">{error.message}</small>}
                    </>
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="description">Description</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field, fieldState: { error }  }) => (
                    <>
                      <InputText
                        id={field.name}
                        {...field}
                        placeholder="Description"
                        className={error ? 'p-invalid' : ''}
                        />
                      {error && <small className="p-error">{error.message}</small>}
                    </>
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="tag">Tag</label>
                <Controller
                  name="tag"
                  control={control}
                  rules={{ required: 'Tag is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <InputText id={field.name} {...field} placeholder="Tag" className={error ? 'p-invalid' : ''}/>
                      {error && <small className="p-error">{error.message}</small>}
                    </>
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="ceilingAmount">Ceiling Amount</label>
                <Controller
                  name="ceilingAmount"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <InputNumber
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      mode="currency"
                      currency="RWF"
                      locale="en-US"
                      placeholder="Ceiling Amount"
                    />
                  )}
                />
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="loanPeriod">Loan Period(Month)</label>
                <Controller
                  name="loanPeriod"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <InputNumber
                      id={name}
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      placeholder="Loan Period"
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
                      options={['Bullet', 'Monthly', 'Quarterly', 'Custom']}
                    />
                  )}
                />
              </div>
              {disbursementFrequency !== 'Bullet' && (
                <div className="col-12 md:col-6">
                  <label htmlFor="repaymentFrequencyLimit">
                  Repayment Frequency Limit
                  </label>
                  <Controller
                    name="repaymentFrequencyLimit"
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
              )}
              <div className="col-12">
                <Button label="Create" className="w-3" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
