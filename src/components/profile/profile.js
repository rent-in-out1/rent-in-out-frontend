import React from "react";
import { Wrapper } from "../style/wrappers/userProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Location from "../icons/location";
import Telephone from "../icons/telephone";
import Mail from "../icons/mail";
import Calendar from "../icons/calendar";
import OwnPosts from "../ownPosts";
import Pencil from "../icons/pencil";

const Profile = () => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  return (
    <Wrapper>
      <nav>
        <div>
          <ul>
            <li>Posts</li>
            <li>Info</li>
          </ul>
          <div>
            rank
          </div>
        </div>
      </nav>
      <main>
        <aside id='details' className='p-1 pb-0' onClick={() => {
          if (user.role === "admin") nav("/admin/profileEdit");
          else nav("/profileEdit");
        }}>
          <div className='flex items-center justify-center'>
            <div className="userDetails capitalize bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl">
              <h3 className="flex items-center justify-between mb-1 capitalize"><span>{user.fullName?.firstName} {user.fullName?.lastName}</span> <Pencil/></h3>
              <h5 className='flex items-center mb-1'><Location /> {user?.country} {user?.city}</h5>
              <h5 className='flex items-center mb-1'><Telephone /> {user?.phone}</h5>
              <h5 className='flex items-center mb-1 lowercase'><Mail /> {user?.email}</h5>

              {user.birthdate && <h5 className='flex items-center'><Calendar /> Birthdate : {user?.birthdate?.split("T")[0]}</h5>}
            </div>
          </div>
          <div className='activity flex justify-center mt-4 '>
            <div className='bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl'>
              <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Activation</span>
              <h2>{user.fullName?.firstName} Liked shimon post</h2>
              <h2>Rent skateboard from Ido</h2>
            </div>
          </div>
        </aside>
        <section id='main' className='flex items-center justify-center p-1 mt-4 md:mt-0'>
          <div className="userDetails bg-white w-full overflow-hidden min-h-20 rounded-xl p-3 shadow-xl">
            <OwnPosts id={user._id} col={1} />
          </div>
        </section>
        <aside id='ads' className='hidden justify-center p-2 xl:flex'>
          <div id='ad' className='ads'>
            <header className='bg-white w-full overflow-hidden h-10/12 rounded-xl p-3 shadow-xl header cursor-pointer' onClick={() => window.open("https://www.youtube.com/watch?v=XxXyfkrP298", "_blank")}>
              <div className="container">
                <p className='text-mute text-sm text-gray-400 mb-1'>adv.</p>
                <div className='mb-2'>
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/255716/acme.svg" alt='ads' />
                </div>
                <div className="ad leaderboard">
                  <img className='h-full w-full' src="https://images.pexels.com/photos/10875046/pexels-photo-10875046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ads" />
                </div>
              </div>
            </header>
          </div>
        </aside>
      </main>
    </Wrapper>
  );
};
export default Profile;
