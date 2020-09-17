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
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/fab";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";

import DefaultTemplate from "_components/templates/default";

import AddServiceModal from "_organisms/services/add-service-modal";

import actions from "./actions";
import "./style.css";

const ServicePage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector((state) => state.auth.company.id);
  const branchId = useSelector((state) => state.branch.selectedBranch);

  const services = useSelector((state) => state.service.get_services);
  const workingTimeGroups = useSelector(
    (state) => state.workingTime.get_working_time_groups
  );

  const addServiceForm = useSelector((state) => state.input);

  const [addServiceModal, setAddServiceModal] = useState(false);

  useEffect(() => {
    dispatch(actions.getServices(branchId));
    dispatch(actions.getWorkingTimeGroups(companyId));
  }, [branchId]);

  const addService = () => {
    let data = {
      branchId: branchId,
      name: addServiceForm.addServiceForm.name,
      serviceLetter: addServiceForm.addServiceForm.serviceLetter,
      workingTimeGroupId: addServiceForm.addServiceForm.workingTimeGroupId,
    };

    dispatch(
      actions.addService(data, () => {
        setAddServiceModal(false);
        dispatch(actions.getServices(branchId));
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
                  <TableCell>Letra</TableCell>
                  <TableCell>Horário de funcionamento</TableCell>
                  <TableCell>Ativo</TableCell>
                  <TableCell>Açoes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.loading && <CircularProgress />}
                {!services.loading &&
                  !services.error &&
                  services.data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.serviceLetter}</TableCell>
                      <TableCell>{row.workingTimeGroup.name}</TableCell>
                      <TableCell>
                        {(row.status === "active" && (
                          <Chip
                            icon={<CheckIcon className="activeChipIcon" />}
                            label="Ativo"
                            className="activeChip"
                          />
                        )) || <Chip icon={<CloseIcon />} label="Inativo" />}
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" color="primary">
                          <EditIcon className="actionIconButton" />
                        </IconButton>
                        <IconButton aria-label="delete" color="primary">
                          <DeleteIcon className="actionIconButton" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Fab
            color="primary"
            aria-label="add"
            className="addServiceFab"
            onClick={() => setAddServiceModal(true)}
          >
            <AddIcon />
          </Fab>
        </div>
        <AddServiceModal
          open={addServiceModal}
          setModal={setAddServiceModal}
          workingTimeGroups={workingTimeGroups}
          handleAddService={addService}
        />
      </DefaultTemplate>
    </>
  );
};

export default ServicePage;
