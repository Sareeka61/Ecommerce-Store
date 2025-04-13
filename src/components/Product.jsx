import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import CardList from "./CardList";

export const Product = () => {
  const serverUrl = "http://127.0.0.1:8000/api/product/product/"
  const get_category_URL = 'http://127.0.0.1:8000/api/product/category/';

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    val: '',
    price: '',
    rating: '',
    category: ''    
  });
  const [ previousPage, setPreviousPage ] = useState(null);
  const [ nextPage, setNextPage ] = useState(null);

  useEffect(() => {
    axios
      .get(serverUrl) 
      .then((res) => {
        if ( res.data.next ) {
          setNextPage(() => {
            return res.data.next;
          })
        }
        if ( res.data.previous ) {
          setPreviousPage(() => {
            return res.data.previous;
          })
        }

        setProduct(() => {
          return res.data.results;
        });
      }) 
      .catch((err) => {
        console.log(err);
      }); 

      getAllCategories();
      
  }, [serverUrl]);

  const token = localStorage.getItem('jwt');

  const headers = {
      'Authorization' : `Bearer ${token}`
  }

  const getAllCategories = () => {
    axios
    .get(get_category_URL, {headers})
    .then((res) => {
      setCategory(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  const handleCategoryChange = (e, category) => {
    setData(() => {
      return {
        ...data,
        category : e.target.value
      }
    })
  }

  const handlePriceChange = (e, category) => {
    setData(() => {
      return {
        ...data,
        price : e.target.value
      }
    })
  }

  const handleRatingChange = (e, category) => {
    setData(() => {
      return {
        ...data,
        rating : e.target.value
      }
    })
  }

  const handleSearchKey = (e, category) => {
    setData(() => {
      return {
        ...data,
        val : e.target.value
      }
    })
  }

  const handleSearchButtonClick = () => {
    
    let origin = 'http://127.0.0.1:8000/api/product/product/';

    if ( data.category.length > 0) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}`
    }

    if ((data.category.length > 0) && (data.price.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&price=${data.price}`
    }
    
    if ((data.category.length > 0) && (data.rating.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&rating=${data.rating}`
    }

    if ((data.category.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&val=${data.val}`
    }

    if ((data.category.length > 0) && (data.price.length > 0) && (data.rating.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&price=${data.price}&rating=${data.rating}`
    }

    if ((data.category.length > 0) && (data.price.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&price=${data.price}&search=${data.val}`
    }
    
    if ((data.category.length > 0) && (data.rating.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&rating=${data.rating}&search=${data.val}`
    }
    
    if ((data.category.length > 0) && (data.price.length > 0) && (data.rating.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?category=${data.category}&price=${data.price}&rating=${data.rating}&search=${data.val}`
    }

    if ( data.price.length > 0) {
      origin = `http://127.0.0.1:8000/api/product/product/?price=${data.price}`
    }

    if ((data.price.length > 0) && (data.rating.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?price=${data.price}&rating=${data.rating}`
    }

    if ((data.price.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?price=${data.price}&search=${data.val}`
    }

    if ( data.rating.length > 0) {
      origin = `http://127.0.0.1:8000/api/product/product/?rating=${data.rating}`
    }

    if ((data.rating.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?rating=${data.rating}&search=${data.val}`
    }

    if ( data.val.length > 0) {
      origin = `http://127.0.0.1:8000/api/product/product/?search=${data.val}`
    }

    if ((data.price.length > 0) && (data.rating.length > 0) && (data.val.length > 0)) {
      origin = `http://127.0.0.1:8000/api/product/product/?price=${data.price}&rating=${data.rating}&search=${data.val}`
    }

    axios
      .get(origin, {headers})
      .then((res) => {
        if ( res.data.count !== 0) {
          setProduct(() => {
            return res.data.results
          })
        } 
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNext = () => {
    axios
      .get(nextPage, { headers })
      .then((res) => {

        console.log("next button click:"+        JSON.stringify(res.data))

        if (res.data.previous ) {
          setPreviousPage(() => {
            return res.data.previous
          })
        }

          setNextPage(() => {
            return res.data.next
          })

        if ( res.data.count !== 0) {
          setProduct(() => {
            return res.data.results
          })
        }
        })
      
      .catch((err) => {
        console.log(err)
      })
  }
 
  const handlePrevious = () => {
    axios
      .get(previousPage, { headers })
      .then((res) => {
        console.log("previous button click:"+        JSON.stringify(res.data))

          setNextPage(() => {
            return res.data.next
          })

          setPreviousPage(() => {
            return res.data.previous
          })

        if ( res.data.count !== 0) {
          setProduct(() => {
            return res.data.results
          })
        }
        })
      
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div>
      <div style={{
                    height: '10vh',
                  }}
      >
        <Container className="mt-5 ms-6 ">
          <Row>
            <Col sm={6}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 ms-2 w-100"
                  aria-label="Search"
                  onChange={(e) => handleSearchKey(e)}
                />

                 <select class="form-select m-2" aria-label="Default select example" onChange={(e) =>  handleCategoryChange(e)}>
                   <option selected value=''>Category</option>
                   {category.map((cat, idx) => (
                    <option key={idx}  value={cat.category.toLowerCase()}>{cat.category}</option>
                   ))}
                 </select>
   
                 <select class="form-select m-2" aria-label="Default select example" onChange={(e) =>  handlePriceChange(e)}>
                   <option selected value=''>Price</option>
                    <option value='1'>ascending</option>
                    <option value='0'>default</option>
                    <option value='-1'>descending</option>
                 </select>
   
                 <select class="form-select m-2" aria-label="Default select example" onChange={(e) =>  handleRatingChange(e)}>
                   <option selected value=''>Rating</option>
                    <option value='1'>ascending</option>
                    <option value='0'>default</option>
                    <option value='-1'>descending</option>
                 </select>
            
              <Button className="m-2" onClick={(e) => handleSearchButtonClick(e)}>
                <i class="bi bi-search"></i>
              </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
</div>

    {product && <CardList product={product} /> }

      <div style={{display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height: '20vh'
                  }}
        >
        <Button className="pull-right me-2" onClick={(e) => handlePrevious(e)}>
          <i class="bi bi-arrow-bar-left"></i>
        </Button>
        <Button className="pull-right me-2" onClick={(e) => handleNext(e)}>
          <i class="bi bi-arrow-bar-right"></i>
        </Button>
      </div>
    </>
  );
};