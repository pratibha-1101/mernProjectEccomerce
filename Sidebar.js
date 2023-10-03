import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import ImportExportSharpIcon from '@mui/icons-material/ImportExportSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';


const Sidebar = () => {
  return (
    <div className="sidebar">

      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>


      <Link to="/admin/dashboard">
        <p>
          <GridOnSharpIcon /> Dashboard
        </p>
      </Link>
      
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreSharpIcon />}
          defaultExpandIcon={<ImportExportSharpIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddSharpIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddCircleOutlineSharpIcon />} />
            </Link>

          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltSharpIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleOutlineSharpIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewSharpIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
