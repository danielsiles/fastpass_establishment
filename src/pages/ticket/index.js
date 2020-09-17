import React, { useEffect, useState } from "react";
import "./style.css";
import DefaultTemplate from "_components/templates/default";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Select from "_atoms/input/select";
import NonFinishedTickets from "_organisms/non-finished-tickets";
import Button from "_atoms/button";
import TicketActionPanel from "_organisms/ticket-action-panel";
import CallNextTicketModal from "_organisms/call-next-ticket-modal";
import PendingTickets from "_organisms/pending-tickets";
import AddTicketModal from "_organisms/add-ticket-modal";

import moment from "moment";

import actions from "./actions";

const TicketPage = () => {
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.get_branch_details);
  const waitingTickets = useSelector(
    (state) => state.ticket.get_waiting_tickets
  );
  const nonFinishedTickets = useSelector(
    (state) => state.ticket.list_non_finished_tickets
  );
  const selectedDesk = useSelector((state) => state.input.deskSelect);
  const selectedService = useSelector((state) =>
    state.input.serviceSelect ? state.input.serviceSelect : { service: 0 }
  );
  const selectedTicket = useSelector((state) => state.ticket.selectedTicket);
  const selectedBranch = useSelector(state => state.branch.selectedBranch)

  const [modal, setModal] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [addTicketModal, setAddTicketModal] = useState(false);

  const [callTicketError, setCallTicketError] = useState(false);
  const [transferTicketError, setTransferTicketError] = useState(false);

  useEffect(() => {
    dispatch(
      actions.getBranch((data) => {
        dispatch(
          actions.getPendingTickets(selectedBranch)
        );
      })
    );
  }, [selectedBranch]);

  useEffect(() => {
    listNonFinishedTickets();
  }, [selectedDesk]);

  const listNonFinishedTickets = () => {
    if (selectedDesk && selectedDesk.desk) {
      dispatch(actions.listNonFinishedTickets(selectedDesk.desk));
    }
    setModal(false);
  };

  const handleCallNextSuccess = () => {
    listNonFinishedTickets();
    dispatch(actions.getPendingTickets(selectedBranch));
  };

  const handleCallNextTicketError = (err) => {
    setCallTicketError("Não existem pessoas na fila para este serviço");
  };

  const callNextInLine = () => {
    if (!selectedDesk || !selectedService) {
      setCallTicketError("Você precisa selecionar o guichê");
      return;
    }
    if (!selectedDesk.desk) {
      setCallTicketError("Você precisa selecionar o guichê");
      return;
    }
    if (selectedService.service === 0) {
      dispatch(
        actions.callNextInLine(
          selectedDesk.desk,
          handleCallNextSuccess,
          handleCallNextTicketError
        )
      );
    } else {
      dispatch(
        actions.callNextInLineByService(
          selectedDesk.desk,
          selectedService.service,
          listNonFinishedTickets,
          handleCallNextTicketError
        )
      );
    }
  };

  const handleTicketSelect = (ticket) => {
    dispatch(actions.selectTicket(ticket.id));
  };

  const changeTicketStatus = (action) => {
    if (action === "transfer") {
      setTransferModal(true);
    } else {
      dispatch(
        actions.changeTicketStatus(selectedTicket, action, () => {
          listNonFinishedTickets();
        })
      );
    }
  };

  const openAddTicketModal = () => {
    setAddTicketModal(true);
  };

  const transferTicket = () => {
    dispatch(
      actions.transferTicket(
        selectedTicket,
        selectedService.service,
        () => {
          setTransferModal(false);
          listNonFinishedTickets();
        },
        () => {
          setTransferTicketError("Você precisa selecionar um serviço.");
        }
      )
    );
  };

  return (
    <>
      <DefaultTemplate pageName="Tickets">
        <div className="contentWrapper">
          {branch?.data.desks && (
            <Select
              defaultItem="Selecione o Guichê"
              formName="deskSelect"
              name="desk"
              label="Guiches"
              items={branch.data.desks}
              loading={branch.loading}
            />
          )}
          <Button
            label="Chamar Próximo"
            className="callNextButton"
            onClick={() => setModal(true)}
          />
          <div className="ticketStatus">Tickets não finalizados:</div>
          <NonFinishedTickets
            tickets={nonFinishedTickets.data}
            onClick={handleTicketSelect}
            filter={["called", "recalled"]}
          />
          <div className="ticketStatus">Tickets confirmados:</div>
          <NonFinishedTickets
            tickets={nonFinishedTickets.data}
            onClick={handleTicketSelect}
            filter={["arrived"]}
          />
          <div className="ticketActionsContainer">
            <div className="ticketStatus">Ticket selecionado:</div>
            <TicketActionPanel
              ticket={nonFinishedTickets.dataMap[selectedTicket]}
              onClick={changeTicketStatus}
            />
          </div>
          {waitingTickets.data && (
            <div className="ticketActionsContainer">
              <div className="ticketStatus">Tickets pendentes:</div>
              <PendingTickets tickets={waitingTickets.data} />
            </div>
          )}
        </div>
        <Fab
          color="primary"
          aria-label="add"
          className="addTicketFab"
          onClick={openAddTicketModal}
        >
          <AddIcon />
        </Fab>
      </DefaultTemplate>
      <CallNextTicketModal
        services={branch?.data.services}
        setModal={setModal}
        open={modal}
        onClick={callNextInLine}
        errorMsg={callTicketError}
      />

      <CallNextTicketModal
        defaultItem="Selecione um serviço..."
        services={branch?.data.services}
        setModal={setTransferModal}
        open={transferModal}
        onClick={transferTicket}
        errorMsg={transferTicketError}
      />

      <AddTicketModal
        open={addTicketModal}
        setModal={setAddTicketModal}
        onClick={() => {}}
      />
    </>
  );
};

export default TicketPage;
