import { useState, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";

import { EditJurorModal } from "./edit_juror_modal";
import { ViewDetailsModal } from "./details_modal";
import { use } from "chai";

function SearchResultsTable({ jurorData }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJuror, setSelectedJuror] = useState(null);

  const handleViewDetails = (juror) => {
    setSelectedJuror(juror);
    setViewModalOpen(true);
  };

  const handleEditJuror = (juror) => {
    setSelectedJuror(juror);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedJuror(null);
  };

  const handleSaveJuror = () => {
    handleCloseModal();
  };

  return (
    <>
      <div className="h-screen mx-1 p-2 max-w-full">
        <Table isHeaderSticky className="flex m-1 p-4" aria-label="Juror Table">
          <TableHeader className="text-center">
            <TableColumn>ID</TableColumn>
            <TableColumn>First Name</TableColumn>
            <TableColumn>Last Name</TableColumn>
            <TableColumn>Badge Number</TableColumn>
            <TableColumn>Summons Date</TableColumn>
            <TableColumn>Reporting Location</TableColumn>
            <TableColumn>Can Postpone</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {jurorData.map((juror) => (
              <TableRow key={juror._id}>
                <TableCell>{juror._id}</TableCell>
                <TableCell>{juror.FirstName}</TableCell>
                <TableCell>{juror.LastName}</TableCell>
                <TableCell>{juror.BadgeNumber}</TableCell>
                <TableCell>{juror.SummonsDate}</TableCell>
                <TableCell>{juror.ReportingLocation}</TableCell>
                <TableCell>{juror.CanPostpone ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex justify-left">
                    <Tooltip showArrow={true} content="Details">
                      <Link
                        anchorIcon={<BsEye />}
                        showAnchorIcon
                        isBlock
                        onClick={() => handleViewDetails(juror)}
                      ></Link>
                    </Tooltip>

                    <Tooltip showArrow={true} content="Edit">
                      <Link
                        anchorIcon={<BsPencilSquare />}
                        showAnchorIcon
                        isBlock
                        onClick={() => handleEditJuror(juror)}
                        style={{ marginLeft: "8px" }}
                      ></Link>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ViewDetailsModal
        isOpen={viewModalOpen}
        onClose={handleCloseModal}
        selectedJuror={selectedJuror}
      />

      <EditJurorModal
        isOpen={editModalOpen}
        onClose={handleCloseModal}
        selectedJuror={selectedJuror}
        onSaveJuror={handleSaveJuror}
      />
    </>
  );
}

export default SearchResultsTable;
