import React from 'react';
import styled from 'styled-components';
import { List, ListItem } from '../List';
import Link from 'next/link';
import media from '../../lib/styles/media';
import useGetUser from './hooks/useGetUser';
import { useQueryClient } from 'react-query';

export const NavLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 0.5rem;
  line-height: 1.5;
  align-items: center;
  transition: background 0.25s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  ${media.custom(400)} {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.5;
  }
  &: hover {
    background: #fff;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    transition: box-shadow 0.35s, transform 0.35s cubic-bezier(0.5, 0, 0.35, 1),
      opacity 0.35s cubic-bezier(0.5, 0, 0.35, 1), background 0.35s;
  }
  .list-wrapper {
    display: flex;
  }
`;

const LogoutButton = styled.div`
  font-size: 1.2rem;
  padding: 0 15px;
  font-weight: 600;
  transition: color 0.25s;
  line-height: 1.5;
  cursor: pointer;
  color: #fff;
  ${NavLogo}:hover & {
    color: black;
  }
`;

export type NavbarProps = {
  items?: string[];
  Logo?: string;
  color?: string;
};

function Navbar(props: NavbarProps) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useGetUser();

  console.log(data);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <NavLogo>
    //   <Link href="/">
    //     <a>
    //       <img alt="logo" src={props.Logo} />
    //     </a>
    //   </Link>
    //   <div className="list-wrapper">
    //     <List>
    //       {props.items.map(list => (
    //         <>
    //           <Link href={`/${list}`} key={list}>
    //             <ListItem items={list} color={props.color} />
    //           </Link>
    //         </>
    //       ))}
    //     </List>
    //   </div>
    // </NavLogo>

    <>
      <div>hello</div>
    </>
  );
}

export default Navbar;
