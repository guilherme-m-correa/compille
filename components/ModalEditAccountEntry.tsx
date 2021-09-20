import { useState, useEffect } from 'react'
import { FaSpinner, FaTimes } from 'react-icons/fa'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import ErrorMessage from './ErrorMessage'
import ErrorMessageBox from './ErrorMessageBox'
import { api } from '../hooks/fetch'
import {
  normalizeDate,
  parseDateString,
  normalizeCurrency,
  normalizeNumber
} from '../helpers'

interface ModalAddAccountEntry {
  personAccountEntry: any
  open: boolean
  setOpen: (state: boolean) => void
  onAdd: () => Promise<void>
}

interface FormValues {
  account_entry_id: string
  date: string
  value: string
  description: string
}

const ModalEditAccountEntry = ({
  personAccountEntry,
  open,
  setOpen,
  onAdd
}: ModalAddAccountEntry) => {
  const today = new Date()
  const [submitError, setSubmitError] = useState('')
  const [accountEntries, setAccountEntries] = useState([])

  async function loadAccountEntries() {
    try {
      const { data } = await api.get(`/comercial/account_entries`)
      setAccountEntries(data)
      setSubmitError('')
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    loadAccountEntries()
  }, [])

  if (!open) {
    return <></>
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Novo lançamento
                </h3>
                <div className="flex w-full">
                  <Formik
                    initialValues={{
                      account_entry_id:
                        personAccountEntry?.account_entry_id || '',
                      date: personAccountEntry?.date
                        ? format(
                            new Date(personAccountEntry.date),
                            'dd/MM/yyyy'
                          )
                        : '',
                      value: personAccountEntry?.value || '',
                      description: personAccountEntry?.description || ''
                    }}
                    validationSchema={Yup.object({
                      account_entry_id: Yup.string().required(
                        'Tipo obrigatório'
                      ),
                      date: Yup.date()
                        .typeError('Data inválida')
                        .transform(parseDateString)
                        .required('Data de obrigátoria'),
                      value: Yup.string().required('Valor obrigátorio'),
                      description: Yup.string()
                    })}
                    onSubmit={async (
                      values: FormValues,
                      { setSubmitting }: FormikHelpers<FormValues>
                    ) => {
                      try {
                        await api.put(
                          `/comercial/person_account_entries/${personAccountEntry.id}`,
                          {
                            ...values,
                            value: normalizeNumber(String(values.value)),
                            date: parseDateString(today, values.date)
                          }
                        )

                        onAdd()
                        setOpen(false)
                      } catch (err) {
                        console.log(err)
                        if (err.response && err.response.status === 400) {
                          setSubmitError(err.response.data.msg)
                        } else if (
                          err.response &&
                          err.response.status === 500
                        ) {
                          setSubmitError(
                            'Ocorreu um erro em nossos servidores, tente mais tarde.'
                          )
                        } else {
                          setSubmitError(
                            'Ocorreu um erro em nossa aplicação, tente novamente mais tarde'
                          )
                        }
                      } finally {
                        setSubmitting(false)
                      }
                    }}
                  >
                    {({ isSubmitting, errors, touched, values }) => (
                      <Form className="mt-8 space-y-8">
                        {submitError && (
                          <ErrorMessageBox>{submitError}</ErrorMessageBox>
                        )}
                        <div>
                          <div className="mt-4">
                            <label
                              className="text-black-400 font-semibold"
                              htmlFor="accont_entry_id"
                            >
                              Tipo de lançamento
                            </label>
                            <Field
                              id="account_entry_id"
                              name="account_entry_id"
                              as="select"
                              className={
                                errors.account_entry_id &&
                                touched.account_entry_id
                                  ? 'input mt-2 border-red-500'
                                  : 'input mt-2'
                              }
                            >
                              <option value="" disabled>
                                Selecione...
                              </option>
                              {accountEntries.map(accountEntry => (
                                <option
                                  key={accountEntry.id}
                                  value={accountEntry.id}
                                >
                                  {accountEntry?.name}
                                </option>
                              ))}
                            </Field>
                            {errors.account_entry_id &&
                              touched.account_entry_id && (
                                <ErrorMessage>
                                  {errors.account_entry_id}
                                </ErrorMessage>
                              )}
                          </div>

                          <div className="mt-4 flex justify-between gap-4">
                            <div>
                              <label
                                className="text-black-400 font-semibold"
                                htmlFor="email"
                              >
                                Data
                              </label>
                              <Field
                                id="date"
                                name="date"
                                value={normalizeDate(values.date)}
                                className={
                                  errors.date && touched.date
                                    ? 'input mt-2 border-red-500'
                                    : 'input mt-2'
                                }
                                placeholder="Digite uma data"
                              />
                              {errors.date && touched.date && (
                                <ErrorMessage>{errors.date}</ErrorMessage>
                              )}
                            </div>

                            <div>
                              <label
                                className="text-black-400 font-semibold"
                                htmlFor="value"
                              >
                                Valor
                              </label>
                              <Field
                                id="value"
                                name="value"
                                value={normalizeCurrency(values.value)}
                                className={
                                  errors.value && touched.value
                                    ? 'input mt-2 border-red-500'
                                    : 'input mt-2'
                                }
                                placeholder="Digite o valor"
                              />
                              {errors.value && touched.value && (
                                <ErrorMessage>{errors.value}</ErrorMessage>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            className="text-black-400 font-semibold"
                            htmlFor="description"
                          >
                            Descrição
                          </label>
                          <Field
                            id="description"
                            name="description"
                            className={
                              errors.description && touched.description
                                ? 'input mt-2 border-red-500'
                                : 'input mt-2'
                            }
                            placeholder="Digite o valor"
                          />
                          {errors.description && touched.description && (
                            <ErrorMessage>{errors.description}</ErrorMessage>
                          )}
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-6 right-6 text-gray-500"
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                          <button
                            disabled={isSubmitting}
                            type="button"
                            onClick={() => setOpen(false)}
                            className="secondary-btn border-blue-500 text-blue-500  hover:border-blue-500 hover:text-blue-500"
                          >
                            CANCELAR
                          </button>
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="ml-2 primary-btn"
                          >
                            {isSubmitting ? (
                              <FaSpinner className="animate-spin" size={24} />
                            ) : (
                              'SALVAR'
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEditAccountEntry
