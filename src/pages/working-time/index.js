import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/fab";
import AddIcon from "@material-ui/icons/Add";

import moment from "moment";

import DefaultTemplate from "_components/templates/default";

import AddWorkingTimeModal from "_organisms/working-time/add-working-time-modal";

import actions from "./actions";
import "./style.css";

const WorkingTimePage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector((state) => state.auth.company.id);
  const branchId = useSelector((state) => state.branch.selectedBranch);

  const workingTimeGroups = useSelector(
    (state) => state.workingTime.get_working_time_groups
  );

  const addWorkingTimeForm = useSelector(
    (state) => state.input.addWorkingTimeForm
  );

  const [addWorkingTimeModal, setAddWorkingTimeModal] = useState(false);

  useEffect(() => {
    dispatch(actions.getWorkingTimeGroups(companyId));
  }, []);

  const addWorkingTime = () => {
    console.log(addWorkingTimeForm);
    let formData = addWorkingTimeForm;
    let data = {
      companyId: companyId,
      name: formData.name,
      workingTimes: [
        formData.openTime_0 &&
          formData.closeTime_0 && {
            closeTime: moment(formData.closeTime_0, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_0, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 0,
          },
        formData.openTime_1 &&
          formData.closeTime_1 && {
            closeTime: moment(formData.closeTime_1, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_1, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 1,
          },
        formData.openTime_2 &&
          formData.closeTime_2 && {
            closeTime: moment(formData.closeTime_2, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_2, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 2,
          },
        formData.openTime_3 &&
          formData.closeTime_3 && {
            closeTime: moment(formData.closeTime_3, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_3, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 3,
          },
        formData.openTime_4 &&
          formData.closeTime_4 && {
            closeTime: moment(formData.closeTime_4, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_4, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 4,
          },
        formData.openTime_5 &&
          formData.closeTime_5 && {
            closeTime: moment(formData.closeTime_5, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_5, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 5,
          },
        formData.openTime_6 &&
          formData.closeTime_6 && {
            closeTime: moment(formData.closeTime_6, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            openTime: moment(formData.openTime_6, "HH:mm:ss").format(
              "HH:mm:ss"
            ),
            weekDay: 6,
          },
      ],
    };

    data.workingTimes = data.workingTimes.filter((workingTime) => {
      return workingTime;
    });

    dispatch(
      actions.addWorkingTimeGroup(data, () => {
        setAddWorkingTimeModal(false);
        dispatch(actions.getWorkingTimeGroups(companyId));
      })
    );
  };

  return (
    <>
      <DefaultTemplate pageName="Services">
        <div className="contentWrapper">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Segunda</TableCell>
                  <TableCell>Terça</TableCell>
                  <TableCell>Quarta</TableCell>
                  <TableCell>Quinta</TableCell>
                  <TableCell>Sexta</TableCell>
                  <TableCell>Sábado</TableCell>
                  <TableCell>Domingo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workingTimeGroups.loading && <CircularProgress />}
                {!workingTimeGroups.loading &&
                  !workingTimeGroups.error &&
                  workingTimeGroups.data.map((workingTimeGroup) => (
                    <TableRow key={workingTimeGroup.name}>
                      <TableCell component="th" scope="row">
                        {workingTimeGroup.name}
                      </TableCell>
                      {workingTimeGroup.workingTimes?.map((workingTime) => (
                        <TableCell>
                          {workingTime.openTime} - {workingTime.closeTime}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Fab
            color="primary"
            aria-label="add"
            className="addServiceFab"
            onClick={() => setAddWorkingTimeModal(true)}
          >
            <AddIcon />
          </Fab>
        </div>
        <AddWorkingTimeModal
          open={addWorkingTimeModal}
          setModal={setAddWorkingTimeModal}
          workingTimeGroups={workingTimeGroups}
          handleAddWorkingTime={addWorkingTime}
        />
      </DefaultTemplate>
    </>
  );
};

export default WorkingTimePage;
