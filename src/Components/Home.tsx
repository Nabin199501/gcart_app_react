import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducer/Reducer';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [item, setItem] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const itemsPerPage = 9;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('https://fakestoreapi.in/api/products');
    setProducts(res.data.products);
    setItem(res.data.products.slice(0, 2));
  };

  const fetchCategories = async () => {
    const res = await axios.get('https://fakestoreapi.in/api/products/category');
    setCategories(res.data.categories);
  };

  const filterByCategory = async (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`);
    setProducts(res.data.products);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product.id));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categoryColors = ['#ff6347', '#f08080', '#f5a623', '#ff7f50', '#32cd32', '#8a2be2', '#20b2aa', '#ff1493'];

  // Category to image mapping
  const imgMap: { [key: string]: string } = {
    TV: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmohlrymuKBrbhScBKpMoyPH320VVsZueoFtLZ9wP1Hzf53i9erwU3NGgUACcHVnoQYJw&usqp=CAU',
    Laptop: 'https://t3.ftcdn.net/jpg/02/49/82/50/360_F_249825007_f5dzNTBuUZoV5nERUWTlPDoU3cvLIBzn.jpg',
    mobiles: 'https://t4.ftcdn.net/jpg/05/36/24/13/360_F_536241340_GsrsNhcWC0hyTVaJLilNafyDw6fl0cC8.jpg',
    Audio: 'https://media.istockphoto.com/id/1189124876/video/black-and-white-sound-icon-audio-music-speaker-animation.jpg?s=640x640&k=20&c=-MH5kixm4YfRIersYM8rKij1RVgAH8ixtTw0xJ17tj4=',
    Gaming: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRxQsAz_rZRYwq0PjqCbM9tu1zhMYj46nfN_gSOReUPvoWanK7l8nloYRAchtts_nWgMcdSn6WAX0S1PUe1WJmzXkvfFwO4xpeAa37k9fRG',
    Application: 'https://thumbs.dreamstime.com/b/fridge-icon-vector-image-suitable-mobile-application-web-print-media-341752785.jpg'
  };

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-12">

          {/* Row 1: Category Buttons with Images */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-between mb-3">
                {categories.map((cat, i) => {
                  const color = categoryColors[i % categoryColors.length];
                  const img = imgMap[cat] || 'https://cdn.dribbble.com/userupload/17064056/file/original-23909ae05b7ad399e60a61467cca821f.jpg?resize=400x0';
                  return (
                    <button
                      key={i}
                      className="d-flex align-items-center justify-content-center btn m-1"
                      style={{
                        width: '12%',
                        backgroundColor: color,
                        color: '#fff',
                        border: 'none',
                        minHeight: '60px'
                      }}
                      onClick={() => filterByCategory(cat)}
                    >
                      <img
                        src={img}
                        alt={cat}
                        style={{ width: '24px', height: '24px', marginRight: '8px' }}
                      />
                      <span className="text-capitalize">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 2: Buttons & Best Sellers */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex justify-content-start align-items-center mb-3">
                <div className="d-flex" style={{ width: 'auto', marginRight: '20px' }}>
                  <button
                    className="btn btn-outline-warning m-1"
                    onClick={fetchProducts}
                    style={{ width: '100px' }}
                  >
                    Show All
                  </button>
                  <button
                    className="btn btn-outline-success m-1"
                    onClick={() => {
                      const cheap = [...products].sort((a, b) => a.price - b.price);
                      setProducts(cheap);
                    }}
                    style={{ width: '100px' }}
                  >
                    Cheap
                  </button>
                </div>

                {/* Best Sellers */}
                <div className="d-flex justify-content-start">
                  <div className="p-2">
                    <img src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png" alt="Apple" style={{ width: '50px' }} />
                  </div>
                  <div className="p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/450px-Dell_Logo.svg.png" alt="Dell" style={{ width: '50px' }} />
                  </div>
                  <div className="p-2">
                    <img src="https://i.gadgets360cdn.com/large/redmilogo_small_1547098405877.jpg" alt="Redmi" style={{ width: '50px' }} />
                  </div>
                  <div className="p-2">
                    <img src="https://blog.logomaster.ai/hs-fs/hubfs/samsung-logo-1993.jpg?width=672&height=454&name=samsung-logo-1993.jpg" alt="Samsung" style={{ width: '50px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Carousel */}
          <div className="row mt-4">
            <div className="col-12">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="10000">
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/344ff33887cce3b0.jpg?q=20" className="d-block w-100 carousel-img" alt="..." />
                  </div>
                  <div className="carousel-item" data-bs-interval="2000">
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/b92c19fb307a8aaa.jpeg?q=20" className="d-block w-100 carousel-img mx-auto" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/07bdea65a26899b0.jpeg?q=20" className="d-block w-100 carousel-img mx-auto" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 4: Product Grid */}
          <div className="row mt-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-3">
                <div className="card h-100">
                  <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col text-center">
              <ul className="pagination justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1}>
        <div className="modal-dialog">
          {selectedProduct && (
            <div className="modal-content">
              <div className="modal-header">
                <h5>{selectedProduct.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body text-center">
                <img src={selectedProduct.image} className="img-fluid" alt="Modal" />
                <p className="mt-3">${selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToCart(selectedProduct)}
                  data-bs-dismiss="modal"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;
