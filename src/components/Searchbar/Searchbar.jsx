import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Searchbr.module.css';
import { ImSearch } from 'react-icons/im';


export default function Searchbar({onSubmit}){
const [artName, setaAtName] = useState('');

 const  handleNameChange = event => {
    setaAtName(event.currentTarget.value.toLowerCase());
  };

 const handleSubmit = event => {
    event.preventDefault();

    if (artName.trim() === '') {
      return toast('Enter a name');
    }
    onSubmit(artName);
    setaAtName('');
  };


    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>
              <ImSearch /> Search
            </span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={artName}
            onChange={handleNameChange}
          />
        </form>
      </header>
    );

}


Searchbar.protoType = {
  artName: PropTypes.string,
};


















// export default class Searchbar extends Component {
//   state = {
//     artName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ artName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.artName.trim() === '') {
//       return toast('Enter a name');
//     }
//     this.props.onSubmit(this.state.artName);
//     this.setState({ artName: '' });
//   };

//   render() {
//     return (
//       <header className={styles.Searchbar}>
//         <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={styles.SearchFormButton}>
//             <span className={styles.SearchFormButtonLabel}>
//               <ImSearch /> Search
//             </span>
//           </button>

//           <input
//             className={styles.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.artName}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.protoType = {
//   artName: PropTypes.string,
// };
