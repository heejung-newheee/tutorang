import { Link } from 'react-router-dom';
import { icon_home, icon_logout } from '../../../../assets';
import * as S from './AdminSidebar.styled';

const AdminSidebar = () => {
  return (
    <S.SideBar>
      <nav>
        <S.ButtonHome to="/">
          <S.IconHome src={icon_home} />
        </S.ButtonHome>
        <S.NavList>
          <S.NavItem>
            <Link to={'/admin/dashboard'}>대시보드</Link>
          </S.NavItem>
          <S.NavItem>
            <Link to={'/admin/user-manage'}>사용자관리</Link>
          </S.NavItem>
          <S.NavItem>
            <Link to={'/admin/board-manage'}>게시판</Link>
          </S.NavItem>
          <S.NavItem>환불취소관리</S.NavItem>
        </S.NavList>
      </nav>
      <S.ButtonLogout>
        <S.IconLogout src={icon_logout} />
        로그아웃
      </S.ButtonLogout>
    </S.SideBar>
  );
};

export default AdminSidebar;
