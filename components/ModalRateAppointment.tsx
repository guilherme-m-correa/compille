import { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import { api } from '../hooks/fetch'

interface ModalRateAppointment {
  open: boolean
  setOpen: (state: boolean) => void
  appointment: Appointment
}

interface RatingType {
  id: number
  type: string
}

const ModalEndAppointment = ({
  open,
  setOpen,
  appointment
}: ModalRateAppointment) => {
  const [ratingTypes, setRatingTypes] = useState<RatingType[]>([])
  const [ratings, setRatings] = useState<number[]>([])

  async function handleRateAppointment() {
    try {
      ratingTypes.map(async rating_type => {
        await api.post(
          `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/ratings`,
          {
            correspondent_id: appointment.correspondent_id,
            requester_id: appointment.requester_id,
            rating_type_id: rating_type.id,
            value: ratings[rating_type.id - 1] || 0
          }
        )
      })
    } catch (error) {
      //
    } finally {
      setOpen(false)
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get(
          `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/rating-types`
        )

        setRatingTypes(data)

        setRatings(data.map(() => 0))
      } catch (error) {
        //
      }
    }

    loadData()
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
                  className="text-lg  mb-4 text-center leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Qual foi sua experiência com Guilherme Matheus Corrêa?
                </h3>

                {ratingTypes.map((rating_type, index) => (
                  <div
                    key={rating_type.id}
                    className="flex flex-col justify-center items-center"
                  >
                    <Typography component="legend">
                      {rating_type.type}
                    </Typography>
                    <Rating
                      name={rating_type.type}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        const updatedRatings = [...ratings]
                        updatedRatings[index] = newValue
                        setRatings(updatedRatings)
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center items-center">
            <button
              type="button"
              onClick={() => handleRateAppointment()}
              className="primary-btn"
            >
              AVALIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEndAppointment
