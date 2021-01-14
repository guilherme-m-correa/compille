import { useEffect, useState } from 'react'

import { IoIosBusiness } from 'react-icons/io'
import { AiOutlineDown, AiOutlineUp, AiOutlineEdit } from 'react-icons/ai'

import axios from 'axios'

import { Spinner } from 'react-bootstrap'

import { GrLocation } from 'react-icons/gr'
import { FaPhoneAlt, FaPlus, FaTrash } from 'react-icons/fa'
import { normalizeCnpj } from '../helpers'

import ModalAddAddress from './ModalAddAddress'
import ModalAddPhones from './ModalAddPhones'
import ModalEditCompany from './ModalEditCompany'
import { Container } from './styles'

function Companies({ person_id }) {
  const [companies, setCompanies] = useState<any>([])

  const [phonesTypes, setPhonesTypes] = useState<any>([])

  const [expand, setExpand] = useState(null)
  const [openAddAddress, setOpenAddAddress] = useState<any>({
    active: false,
    id: null
  })
  const [openAddPhone, setOpenAddPhone] = useState<any>({
    active: false,
    id: null
  })
  const [openEdit, setOpenEdit] = useState<any>({
    active: false,
    company: {}
  })

  const [addressExpand, setAddressExpand] = useState<any>([])
  const [phonesExpand, setPhonesExpand] = useState<any>([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadTypes() {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `https://gateway.compille.com.br/comercial/phonetypes`
        )
        setPhonesTypes(data)
      } catch (err) {}
      setLoading(false)
    }
    loadTypes()
  }, [])

  async function loadCompanies() {
    try {
      const { data } = await axios.get(
        `https://gateway.compille.com.br/comercial/personcompanies/person/${person_id}`
      )
      setCompanies(data)
    } catch (err) {}
  }

  useEffect(() => {
    if (person_id) {
      loadCompanies()
    }
  }, [person_id]); // eslint-disable-line

  async function getDetail(id) {
    setLoading(true)
    try {
      const { data: addressData } = await axios.get(
        `https://gateway.compille.com.br/comercial/companyaddresses/${id}`
      )
      const { data: phoneData } = await axios.get(
        `https://gateway.compille.com.br/comercial/companyphones/${id}`
      )
      setAddressExpand(addressData)
      setPhonesExpand(phoneData)
      setExpand(id)
    } catch (err) {}
    setLoading(false)
  }

  async function handleRemoveAddress(company_id, id) {
    setLoading(true)
    try {
      await axios.delete(
        `https://gateway.compille.com.br/comercial/companyaddresses/${id}`
      )
      getDetail(company_id)
    } catch (err) {}
    setLoading(false)
  }

  async function handleRemovePhone(company_id, id) {
    setLoading(true)
    try {
      await axios.delete(
        `https://gateway.compille.com.br/comercial/companyphones/${id}`
      )
      getDetail(company_id)
    } catch (err) {}
    setLoading(false)
  }

  return (
    <Container>
      <ModalAddAddress
        open={openAddAddress.active}
        setOpen={() =>
          setOpenAddAddress({
            active: false,
            id: null
          })
        }
        company_id={openAddAddress.id}
        onAdd={() => getDetail(openAddAddress.id)}
      />
      <ModalAddPhones
        open={openAddPhone.active}
        setOpen={() =>
          setOpenAddPhone({
            active: false,
            id: null
          })
        }
        company_id={openAddPhone.id}
        onAdd={() => getDetail(openAddPhone.id)}
      />
      {openEdit.active && (
        <ModalEditCompany
          open={openEdit.active}
          setOpen={() =>
            setOpenEdit({
              active: false,
              company: {}
            })
          }
          company={openEdit.company}
          onUpdate={loadCompanies}
        />
      )}
      <hr />
      <div id="list">
        {companies.map(company => (
          <div key={company.company_id} className="accordion">
            <div className="summary flex items-center">
              <IoIosBusiness size="40px" className="mr-1" />
              <div>
                <h5 className="mb-0">{company.company.social_name}</h5>
                <p className="mb-0">{normalizeCnpj(company.company.cnpj)}</p>
              </div>
              <span>{company.company.uf}</span>
              <div className="d-block ml-auto mt-auto">
                <button
                  type="button"
                  className="mr-2"
                  onClick={() =>
                    setOpenEdit({
                      active: true,
                      company: company.company
                    })
                  }
                >
                  <AiOutlineEdit /> Editar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (expand === company.company_id) {
                      setExpand(null)
                    } else {
                      getDetail(company.company_id)
                    }
                  }}
                >
                  {loading && <Spinner animation="border" size="sm" />}
                  {expand === company.company_id && (
                    <>
                      <AiOutlineUp /> Ver menos
                    </>
                  )}
                  {expand !== company.company_id && (
                    <>
                      <AiOutlineDown /> Ver mais
                    </>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`detail ${
                expand === company.company_id && 'expanded'
              }`}
            >
              <div className="row flex">
                <div className="col-md-8">
                  <div className="flex justify-between items-center head_detail mb-4">
                    <small>
                      <GrLocation /> Endereços
                    </small>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAddAddress({
                          active: true,
                          id: company.company_id
                        })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div id="list">
                    {addressExpand.map(address => (
                      <div key={address.id} className="item flex">
                        <div>
                          <h5>{address.label}</h5>
                          <p>
                            {address.street}, {address.street_number}{' '}
                            {address.street_complement}, {address.zip_code},{' '}
                            {address.neighborhood},{' '}
                            {address.city && address.city.name} -{' '}
                            {address.city &&
                              address.city.state &&
                              address.city.state.uf}
                          </p>
                          {(address.is_billing_address === 1 ||
                            address.is_billing_address === true) &&
                          (address.is_main_address === 1 ||
                            address.is_main_address === true) ? (
                              <span>Endereço Principal e Cobrança</span>
                          ) : (
                            <>
                              {(address.is_billing_address === 1 ||
                                address.is_billing_address === true) && (
                                <span>Endereço de Cobrança</span>
                              )}
                              {(address.is_main_address === 1 ||
                                address.is_main_address === true) && (
                                <span>Endereço Principal</span>
                              )}
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          className="d-block ml-auto mt-auto"
                          disabled={loading}
                          onClick={() =>
                            handleRemoveAddress(company.company_id, address.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="flex justify-between items-center head_detail mb-4">
                    <small>
                      <FaPhoneAlt /> Telefones
                    </small>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAddPhone({
                          active: true,
                          id: company.company_id
                        })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div id="list">
                    {phonesExpand.map(phone => (
                      <div className="item flex" key={phone.id}>
                        <div>
                          <p>
                            ({phone.area_code}) {phone.number}
                            <br />
                            {phone.contact}
                          </p>
                          <span>
                            {phonesTypes &&
                              phonesTypes.length > 0 &&
                              phonesTypes.find(
                                p => p.id === phone.phonetype_id
                              ) &&
                              phonesTypes.find(p => p.id === phone.phonetype_id)
                                .name}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="d-block ml-auto mt-auto"
                          disabled={loading}
                          onClick={() =>
                            handleRemovePhone(company.company_id, phone.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Companies
