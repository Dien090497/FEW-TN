import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import './Navbar.css'

export const SidebarData = [
  {
    title: 'Quản lý sản phẩm',
    path: '/',
    icon: <FaIcons.FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Tin tức',
    path: '/news',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lý hóa đơn',
    path: '/bill',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Cài đặt tài khoản',
    path: '/setting',
    icon: <IoIcons.IoIosSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Hỗ trợ',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Thông tin về shop',
    path: '/info',
    icon: <IoIcons.IoIosInformationCircleOutline />,
    cName: 'nav-text'
  }
];
