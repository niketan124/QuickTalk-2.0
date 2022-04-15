import React, { useState, useEffect } from 'react';
import { useNavigate, use } from 'react-router-dom';
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import 'buffer';
import { Buffer } from 'buffer';

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };
    useEffect(() => {
        if (localStorage.getItem("chat-app-user") === null) {
            navigate("/login", { replace: true })
            window.location.reload()
        }
    }, [])
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('please select an avatar', toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = await data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/')
                window.location.reload()
            } else {
                toast.error("Error setting avatar. Please try again by refreshing page", toastOptions)
            }
        }
    };
    useEffect(() => {
        (async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'))
            }
            setAvatars(data);
            setIsLoading(false);
        })()
    }, [])
    return (
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader" className='loader' />
                </Container> : (

                    <Container>

                        <div className="title-container">
                            <h1>
                                Pick an avatar as your profile picture!
                            </h1>
                        </div>
                        <div className="avatars">
                            {
                                avatars.map((avatar, indx) => {
                                    return (
                                        <div key={indx} className={`avatar 
                                ${selectedAvatar === indx ? "selected" : ""}`}>
                                            <img draggable='false'
                                                src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                                                onClick={() => {
                                                    setSelectedAvatar(indx)
                                                }} />
                                        </div>

                                    )
                                })
                            }
                        </div>
                        <button onClick={() => setProfilePicture()}
                            className='submit-btn'>Set as Profile Picture</button>
                    </Container>
                )}
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    user-select: none;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        border-radius: 0.4rem;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
    }
`;