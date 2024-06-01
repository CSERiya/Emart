import React, {useEffect} from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { Link,useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile = () => {

    const {user,loading,isAuthenticated}= useSelector(state=>state.user);
     const navigate=useNavigate();

    useEffect(()=>{
if(isAuthenticated===false){
    navigate('/login');
}
    },[navigate,isAuthenticated])
    
  return (
  <>
   {loading ? <Loader /> : (
                <>
                    {user && (
                        <>
                            <MetaData title={`${user.name}'s Profile`} />
                            <div className='profileContainer'>
                                <div>
                                    <h1>My Profile</h1>
                                    {user.avatar && user.avatar.url && (
                                        <img src={user.avatar.url} alt={user.name} />
                                    )}
                                    <Link to='/me/update'>Edit Profile</Link>
                                </div>
                                <div>
                                    <div>
                                        <h4>Full Name</h4>
                                        <p>{user.name}</p>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>{user.email}</p>
                                    </div>
                                    <div>
                                        <h4>Joined On</h4>
                                        <p>{user.createdAt ? String(user.createdAt).substr(0, 10) : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Link to="/orders">My Orders</Link>
                                        <Link to="/password/update">Change Password</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;