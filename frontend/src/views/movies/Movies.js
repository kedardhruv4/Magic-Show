import React, { useEffect, useState, useCallback } from 'react'
import { Col, Row } from 'reactstrap'
import CardTitles from '../../components/CardTitles'
import { useDispatch } from 'react-redux'
import { contentGet } from '../../redux/action/contentAction'
import ReactPaginate from 'react-paginate'
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner'

const Movies = () => {
  const [movie, setMovie] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 8
  const type = 'movies'
  const dispatch = useDispatch()
  const [loding, setLoding] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const getMovies = useCallback(
    async (type, page, limit) => {
      setLoding(true)
      const response = await dispatch(contentGet(type, page, limit))
      if (response?.data?.status === 200) {
        setMovie(response?.data?.data)
        setTotal(response?.data?.count)
        setLoding(false)
      }
      setLoding(false)
    },
    [page, limit]
  )

  useEffect(() => {
    getMovies(type, page, limit)
  }, [page, limit, isUpdate])
  const handlePageClick = event => {
    setPage(event?.selected + 1)
  }
  return (
    <>
      {!loding ? (
        <>
          <Row className='match-height'>
            {movie?.map((ele, index) => {
              return (
                <CardTitles
                  data={ele}
                  key={index}
                  to={`/movies-view/${ele?._id}`}
                  edit={`/movies-edit/${ele?._id}`}
                  refresh={() => setIsUpdate(!isUpdate)}
                />
              )
            })}
          </Row>
          {movie?.length !== 0 ? (
            <Row>
              <Col lg='4' sm='12'>
                <ReactPaginate
                  nextLabel=''
                  pageCount={total / limit}
                  onPageChange={handlePageClick}
                  breakLabel='...'
                  previousLabel=''
                  activeClassName='active'
                  pageClassName='page-item'
                  breakClassName='page-item'
                  nextLinkClassName='page-link'
                  pageLinkClassName='page-link'
                  breakLinkClassName='page-link'
                  nextClassName='page-item next'
                  previousLinkClassName='page-link'
                  previousClassName='page-item prev'
                  containerClassName='pagination react-paginate'
                />
              </Col>
            </Row>
          ) : (
            <h1>No data found</h1>
          )}
        </>
      ) : (
        <SpinnerComponent />
      )}
    </>
  )
}

export default Movies
