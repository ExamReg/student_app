import React from "react";
import "./header.css"
import logo from "./icons/logo-uet2.png";
import iconDropdown from "./icons/icons8-sort-down-16.png";
import Modal from "../modal/modal";
import {changepassword, getUserInfo} from "../../api/authentication-api";

class Header extends React.Component{
    constructor(props)
    {

        super(props);
        const token = localStorage.getItem("token");
        let logout = false;
        if(token === null)
        {
            logout = true
        }
        this.state = {
            logout,
            isOpen: false,

            oldPassword:"",
            newPassword:"",
            rePassword:"",

            nameUser:"",
            IdUser:""
        }
    }
    handleChange = (e) =>{
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]:val});
    };
    getInfoUser = async () =>{
        const res = await getUserInfo();
        if(res.success)
        {
            this.setState({nameUser: res.data.profile.name, IdUser: res.data.profile.id_student})
        }
        else{
            console.log(res.message)
        }
    }
    changePassword = async () =>{
        const {oldPassword, newPassword, rePassword} = this.state;
        if( oldPassword && newPassword && rePassword) {
            if(newPassword === rePassword) {
                let data = {
                    new_password: newPassword,
                    old_password: oldPassword
                }
                const res = await changepassword(data);
                if(res.success)
                {
                    alert("success");
                    this.toggleModal();
                }
                else
                    console.log("loi")
            }
            else {
                console.log("nhap lai mat khau khong dung")
            }
        }
        else
            console.log("dien du thong tin")
    }
    handleLogout = () =>{
        localStorage.removeItem("token");
        this.setState({logout: true})
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    componentDidMount() {
        this.getInfoUser();
    }
    render() {
        if(this.state.logout)
        {
            window.location.replace('/login')
        }
        return(
            <div className="header">
                <div className="group-title">
                    <img  className="logo" src={logo} alt={"logo-uet.jpg"}/>
                    <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ LỊCH THI  </div>
                </div>
                <div className="group-user-menu">
                    <div className="dropdown">
                        <button className="dropbtn">Chào mừng: {this.state.nameUser} - <b>[{this.state.IdUser}]</b> <img style={{marginTop:"-5px"}} src={iconDropdown} alt="dropdown"/></button>
                        <div className="dropdown-content">
                            <div className="btn-user" onClick={this.toggleModal}>
                                <i className="fas fa-user"></i>
                                Thay đổi mật khẩu
                            </div>
                            <div  className="btn-logout" onClick={this.handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>
                                Đăng xuất
                            </div>
                            <Modal show={this.state.isOpen}
                                   onClose={this.toggleModal}
                                   addNew={this.changePassword}
                                   title="Thay đổi mật khẩu  "
                                   childrenContent={
                                       <form>
                                           <div className="modal-group">
                                               <label>Mật khẩu hiện cũ: </label>
                                               <input type="password" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange}/>
                                           </div>
                                           <div className="modal-group">
                                               <label>Mật khẩu mới  : </label>
                                               <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange}/>
                                           </div>
                                           <div className="modal-group">
                                               <label>Xác nhận lại  : </label>
                                               <input type="password" name="rePassword" value={this.state.rePassword} onChange={this.handleChange}/>
                                           </div>
                                       </form>
                                   }
                                   brandButton={"Lưu "}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;