import React, { useEffect, useState } from 'react'
import Layout from '@/components/Dashboard/Layout';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await fetch("/api/auth/fetchUser", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setName(user.name);
        setEmail(user.email);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const response = await fetch("/api/auth/updateProfile", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      toast.success("Profile updated successfully.");
    } else {
      toast.error("Error updating profile.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be minimum of 8 characters");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const response = await fetch("/api/auth/changePassword", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword: password, newPassword }),
    });

    if (response.ok) {
      toast.success("Password updated successfully.");
    } else {
      const data = await response.text();
      toast.error(data)
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-3xl text-gray-900">Settings</h2>
        </div>
        <form className="flex flex-col gap-6">
          <div className="flex justify-between border-b pb-5 gap-4 items-start">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-lg text-gray-900">Personal Info</h3>
              <p className="font-normal text-sm text-gray-600">Update your photo and personal details here.</p>
            </div>
            <div className="flex gap-3">
              <Link href={'/dashboard'} className='px-4 py-2.5 rounded-lg border bg-white border-gray-300 shadow-sm font-semibold text-sm text-gray-700'>Cancel</Link>
              <button className='px-4 py-2.5 rounded-lg border bg-violet-600 border-violet-600 shadow-sm font-semibold text-sm text-white' onClick={handleUpdateProfile}>Submit</button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Name</label>
              <input 
                type="text" 
                className="rounded-lg w-2/4 border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" 
                placeholder='Olivia Rhye' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Email</label>
              <div className="flex rounded-lg w-2/4 border border-gray-300 shadow items-center gap-2 pl-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <input 
                  type="text" 
                  className="rounded-lg w-full outline-none py-2.5 pr-3.5 text-normal text-base text-gray-700" 
                  placeholder='olivia@untitledui.com' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="w-full h-[1px] bg-gray-200" />
          </div>
        </form>
        <form className="flex flex-col gap-6">
          <div className="flex justify-between border-b pb-5 gap-4 items-start">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-lg text-gray-900">Password</h3>
              <p className="font-normal text-sm text-gray-600">Please enter your current password to change your password</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Current Password</label>
              <input 
                type="password" 
                className="rounded-lg w-2/4 border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" 
                placeholder='********' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>New Password</label>
              <div className="w-2/4 flex flex-col gap-1.5">
                <input 
                  type="password" 
                  className="rounded-lg w-full border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" 
                  placeholder='********' 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <p className='font-normal text-sm text-gray-600'>Your new password must be more than 8 characters.</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Confirm New Password</label>
              <input 
                type="password" 
                className="rounded-lg w-2/4 border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" 
                placeholder='********' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
          </div>
          <div className="flex justify-end">
            <div className="flex gap-3">
              <Link href={'/dashboard'} className='px-4 py-2.5 rounded-lg border bg-white border-gray-300 shadow-sm font-semibold text-sm text-gray-700'>Cancel</Link>
              <button className='px-4 py-2.5 rounded-lg border bg-violet-600 border-violet-600 shadow-sm font-semibold text-sm text-white' onClick={handleChangePassword}>Update Password</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Settings;
