import React from 'react';
import MenuItem from '../menuitem/menuitem';

import "./style.css";

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.pathHomeStudy = "/home/resultStudy";
        this.pathHomeRegister = "/home/register";
        this.pathHomePrint = "/home/print";

        this.state = {
            menuItems: [
                {
                title: "Quản lý môn học  ",
                    name:"fas fa-home",
                    route: this.pathHomeStudy
                },
                {
                    title: "Đăng kí thi ",
                    name:"fas fa-user",
                    route: this.pathHomeRegister
                },
                {
                    title :"In lịch thi ",
                    name:"fas fa-print",
                    route: this.pathHomePrint
                }
                ]
        }
    }

    render() {
        return (
            <ul className="menu-list">
                <MenuItem {...this.state.menuItems[0]}/>
                <MenuItem {...this.state.menuItems[1]}/>
                <MenuItem {...this.state.menuItems[2]}/>
            </ul>
        );
    }
}

export default MenuBar;