import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews } from "../../../component/Redux/actions/news";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../../../component/Loader/Loader";
import { Tooltip } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const NewsletterComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);
  const { news, error, message, loading } = useSelector((state) => state.news);

  const deleteButtonHandler = (id) => {
    dispatch(deleteNews(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    dispatch(getAllNews());
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <h1>News Letters</h1>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.email}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {moment(row.createdAt).format(
                        "Do MMMM  YYYY,  dddd,  h:mm:ss a"
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title="Delete" sx={{ mt: 1 }}>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => deleteButtonHandler(row._id)}
                          isLoading={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default NewsletterComponent;
