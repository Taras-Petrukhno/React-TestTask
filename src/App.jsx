// Styles
import './scss/App.scss';

// Assets
import logo from './assets/images/logo.svg';

// Components
import Button from './components/Button';
import UserList from './components/UserList'
import UserFrom from './components/UserFrom';
import MetaContainer from './components/MetaContainer'
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

function App() {
  
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const [pag, setPag] = useState({postPerPage: 6, pages: null, page: 1});
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  
  // Function GET REQUEST /USERS
  let getUsers = useCallback((submit) =>{
  
      if(submit === true) {
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${pag.postPerPage}`)
        .then(function(response) { return response.json(); })
        .then(function(data) { 
          if(!data.success) throw Error(data);
          
          if(pag.page == pag.pages) setShowMoreBtn(false); 
          setUsers(data.users);
          setPag(prev => ({postPerPage: prev.postPerPage, pages: data.total_pages, page: 2}));
        }).catch((error) => {
          alert(error?.message);
          console.log(error);
        });
      } else {
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pag.page}&count=${pag.postPerPage}`)
        .then(function(response) { return response.json(); })
        .then(function(data) { 
          if(!data.success) throw Error(data);
          
          if(pag.page == pag.pages) setShowMoreBtn(false); 
          setUsers([...users, ...data.users]);
          setPag({...pag, page: pag.page + 1, pages: data.total_pages});
        }).catch((error) => {
          alert(error?.message);
          console.log(error);
        });
      }
  
  },[pag, users])


  useEffect(() => {
    // GET REQUEST  /POSITIONS
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(function(response) { return response.json(); })
      .then(function(data) { 
        if(!data.success) throw Error(data);
        setPositions(data.positions);
      }).catch((error) => {
        alert(error?.message);
        console.log(error);
      });
    // Show first page of Users
    getUsers()
  }, [])


  return (
    <>
    <MetaContainer />
    <div className="wrapper">
      <header className='header'>
        <div className="header__container">
          <nav className="header__inner">
            <a href="/" className="header__logo"><img src={logo} alt="logo"  /></a>
            <Button><a href="#get-req">Users</a></Button>
            <Button><a href="#post-req">Sign up</a></Button>
          </nav>
        </div>
      </header>
      <main>
        <section className="main-info">
          <div className="main-info__bg-image"></div>
          <div className="main-info__container">
            <div className="main-info__inner">
              <h1 className="main-info__title title">
                Test assignment for front-end developer
              </h1>
              <p className="main-info__text">
                What defines a good front-end developer is 
                one that has skilled knowledge of HTML, CSS, 
                JS with a vast understanding of User design 
                thinking as they'll be building web interfaces 
                with accessibility in mind. They should also 
                be excited to learn, as the world of Front-End 
                Development keeps evolving.
              </p>
              <Button><a href="#post-req">Sign up</a></Button>
            </div>
          </div>
        </section>
        <section className="get-req" id='get-req'>
          <div className="get-req__container">
            <div className="get-req__inner">
              <h2 className='get-req__title title'>Working with GET request</h2>
              <UserList users={users} showBtn={showMoreBtn} showMoreHandler={getUsers} />
            </div>
          </div>
        </section>
        <section className="post-req" id='post-req'>
          <div className="post-req__container">
            <div className="post-req__inner">
              <h2 className='post-req__title title'>Working with Post request</h2>
              <UserFrom positions={positions} getUsers={getUsers}/>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}

export default App;
