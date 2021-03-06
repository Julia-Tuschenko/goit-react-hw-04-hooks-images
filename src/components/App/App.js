import React, {useState, useEffect} from 'react';
import searchApi from '../../services/searchApi';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/index';
import ImageGallery from '../ImageGallery/index';
import Button from '../Button/index';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


export default function App (){
  
  const [artName, setArtName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalLengh, setTotalLengh] = useState(0);
  
  
  // const toggleModal = (largeImage, imgTags) => {
  //   setShowModal(!showModal);
  //   setLargeImage(largeImage);
  //   setImgTags(imgTags);
  //     };
  //  //   { imageSrc: src, imageAlt: alt }

 const  toggleModal = () => {
    setShowModal(!showModal);
  };

  const  bigImage = (largeImage = '') => {
    if(largeImage){
      setLargeImage(largeImage); 
    };
    toggleModal(); 
  };

useEffect(() => {
    if (!artName) {
      return;
    };
    const feachPictures = () => {
      setIsLoading(true);
      searchApi({artName: artName, page})
        .then(data => {  
            setPictures(prevPictures => [...prevPictures, ...data])
            // setPage(prevState => prevState.page + 1);
            setTotalLengh(data.length);
            if (page > 1) {
              window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',})}
        })          
        .catch(error => {
          setError(toast('Picture not found'(error.message))
          )})
        .finally(() => setIsLoading(false));
    };
    feachPictures();
  }, [artName, page])

  const  handleFormSubmit = (name) => {
    setArtName(name);
    setPage(1);
    setPictures([]);
    setError(null);
    setImgTags('');
    setLargeImage('');
    setTotalLengh(0);
    setIsLoading(false);
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  }
    const btnEnable =pictures.length > 0 && !isLoading &&  totalLengh > 0;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleFormSubmit} />

        {error && <h1>Oops, it's all gone</h1>}

        <ImageGallery pictures={pictures} bigImage={bigImage} />
        {isLoading && <Loader />}
        {btnEnable && <Button onClick={loadMoreBtnClick} />}
        {showModal && (
          <Modal showModal={bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
};
  


App.propTypes = {
  pictures: PropTypes.array,
  page: PropTypes.number,
  query: PropTypes.string,
  largeImage: PropTypes.string,
  imgTags: PropTypes.string,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
};




































// import React, { Component } from 'react';
// import searchApi from '../../services/searchApi';
// import 'react-toastify/dist/ReactToastify.css';
// import Searchbar from '../Searchbar/index';
// import ImageGallery from '../ImageGallery/index';
// import Button from '../Button/index';
// import Loader from '../Loader/index';
// import Modal from '../Modal/index';
// import styles from './App.module.css';
// import { ToastContainer } from 'react-toastify';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';

// export default class App extends Component {
//   state = {
//     artName: '',
//     pictures: [],
//     page: 1,
//     largeImage: '',
//     imgTags: '',
//     error: '',
//     showModal: false,
//     isLoading: false,
//     totalLengh: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const newName = prevState.artName;
//     const oldName = this.state.artName;

//     const oldPage = this.state.page;
//     const newPage = prevState.page;

//     if (newName !== oldName) {
//       this.fetchPictures();
//     }
//     if (oldPage !== 2 && newPage !== oldPage) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   bigImage = (largeImage = '') => {
//     this.setState({ largeImage });
//     this.toggleModal();
//   };

//   fetchPictures = () => {
//     const { page, artName } = this.state;

//     const options = {
//       page,
//       artName,
//     };

//     this.setState({ isLoading: true });

//     searchApi(options)
//       .then(pictures => {
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...pictures],
//           page: prevState.page + 1,
//           totalLengh: pictures.length,
//         }));
//       })
//       .catch(error => this.setState({ error: toast('Picture not found') }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   handleFormSubmit = artName => {
//     this.setState({ artName: artName, page: 1, pictures: [], error: null });
//   };

//   render() {
//     const {
//       pictures,
//       isLoading,
//       error,
//       showModal,
//       largeImage,
//       imgTags,
//       totalLengh,
//     } = this.state;
//     const btnEnable =
//       pictures.length > 0 && !isLoading && error === null && totalLengh > 0;

//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {error && <h1>{error}</h1>}

//         <ImageGallery pictures={pictures} bigImage={this.bigImage} />
//         {isLoading && <Loader />}
//         {btnEnable && <Button onClick={this.fetchPictures} />}
//         {showModal && (
//           <Modal showModal={this.bigImage}>
//             <img src={largeImage} alt={imgTags} />
//           </Modal>
//         )}
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     );
//   }
// }

// App.propTypes = {
//   pictures: PropTypes.array,
//   page: PropTypes.number,
//   query: PropTypes.string,
//   largeImage: PropTypes.string,
//   imgTags: PropTypes.string,
//   error: PropTypes.string,
//   showModal: PropTypes.bool,
//   isLoading: PropTypes.bool,
// };
