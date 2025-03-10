import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/Message";
import { updateUser } from "../../redux/slices/userSlide";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbPhotoEdit, TbArrowsExchange } from "react-icons/tb";
import { BiUpload, BiTrash } from "react-icons/bi";
import ProfileOverview from "./ProfileOverview";
import ProfileEdit from "./ProfileEdit";
import ChangePassword from "../ChangePassWord/ChangePassWord";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("123456");
  const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState("edit-profile");

  const dispatch = useDispatch();
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });

  const passwordMutation = useMutationHooks((data) => {
    const { id, access_token, currentPassword, newPassword } = data;
    return UserService.updatePassword(
      id,
      { currentPassword, newPassword },
      access_token
    );
  });

  const { data, isSuccess, isError } = mutation;
  const {
    data: passwordData,
    isSuccess: isPasswordSuccess,
    isError: isPasswordError,
  } = passwordMutation;

  useEffect(() => {
    if (isSuccess && data?.status !== "ERROR") {
      toast.success("User information updated successfully!");
      handleGetDetailsUser(user?.id, user?.access_token);
      setIsLoading(false);
    } else if (isError || data?.status === "ERROR") {
      toast.error("Failed to update user information");
      setIsLoading(false);
    }

    if (isPasswordSuccess && passwordData?.status !== "ERROR") {
      toast.success("Password updated successfully!");
      setIsUpdatingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else if (
      isPasswordError ||
      (isPasswordSuccess && passwordData?.status === "ERROR")
    ) {
      toast.error("Failed to update password");
      setIsUpdatingPassword(false);
    }
  }, [isSuccess, isError, isPasswordSuccess, isPasswordError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res.data, access_token: token }));
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setAge(user.age || "");
      setAvatar(user.avatar || "");
      setOldPassword(user.password || "");
    }
  }, [user]);

  console.log(avatar)

  const handleOnchangeEmail = (e) => setEmail(e.target.value);
  const handleOnchangeName = (e) => setName(e.target.value);
  const handleOnchangePhone = (e) => setPhone(e.target.value);
  const handleOnchangeAddress = (e) => setAddress(e.target.value);
  const handleOnchangeAge = (e) => setAge(e.target.value);

  const handleOnchangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        handleUpdateAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      age,
      avatar,
      access_token: user?.access_token,
    });
  };

  const handleUpdate = () => {
    setIsLoading(true);
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      age,
      avatar,
      access_token: user?.access_token,
    });
  };

  const handleUpdatePassword = async (currentPassword, newPassword) => {
    if (!currentPassword) {
      message.error("Current password is required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      message.error("New password and confirm password do not match");
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      message.error("Current password is incorrect");
      return;
    }

    setIsUpdatingPassword(true);
    passwordMutation.mutate({
      id: user?.id,
      currentPassword,
      newPassword,
      access_token: user?.access_token,
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview user={user} />;
      case "edit-profile":
        return (
          <ProfileEdit
            user={user}
            onSave={handleUpdate}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            age={age}
            setAge={setAge}
            isLoading={isLoading}
          />
        );
      case "change-password":
        return (
          <ChangePassword
            onChangePassword={handleUpdatePassword}
            isUpdatingPassword={isUpdatingPassword}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmNewPassword={confirmNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={avatar}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <input
                type="file"
                className="hidden"
                id="avatar-upload"
                onChange={handleOnchangeAvatar}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <BiUpload size={24} />
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <h2 className=" font-semibold mb-2 font-mono text-xl">{name}</h2>
            </div>
            <p className="text-gray-600">{user.job}</p>
          </div>
          <div className="col-span-2">
            <ul className="flex justify-start space-x-8 pb-4 border-b">
              <li>
                <button
                  className={`flex items-center space-x-2 ${activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                    } py-2 px-4 focus:outline-none transition-colors duration-300`}
                  onClick={() => setActiveTab("overview")}
                >
                  <MdOutlineRemoveRedEye size={20} />
                  <span>Overview</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center space-x-2 ${activeTab === "edit-profile"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                    } py-2 px-4 focus:outline-none transition-colors duration-300`}
                  onClick={() => setActiveTab("edit-profile")}
                >
                  <TbPhotoEdit size={20} />
                  <span>Edit Profile</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center space-x-2 ${activeTab === "change-password"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                    } py-2 px-4 focus:outline-none transition-colors duration-300`}
                  onClick={() => setActiveTab("change-password")}
                >
                  <TbArrowsExchange size={20} />
                  <span>Change Password</span>
                </button>
              </li>
            </ul>
            <div className="p-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;