// import React from 'react';

// const Logout = () => {
//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:4008/api/users/logout', {
//         method: 'POST', 
//         credentials: 'include', 
//       });

//       if (response.ok) {
        
//         console.log('User logged out');
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>
//       Logout
//     </button>
//   );
// };

// export default Logout;

// 


// import React from 'react';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            const res = await fetch('http://localhost:4008/api/users/logout', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.status === 401 || !res) {
                toast.error('Please Logout Later', {
                    position: 'top-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                navigate('/home');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                toast.success('Logout Successful', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred during logout', {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        // Just defining the effect, not invoking it here
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <div>
            
        </div>
    )
}

export default Logout;
