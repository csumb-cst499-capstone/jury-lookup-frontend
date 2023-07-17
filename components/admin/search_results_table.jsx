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
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";

import { EditJurorModal } from "./edit_juror_modal";
import { ViewDetailsModal } from "./details_modal";
import { motion } from "framer-motion";
export function SearchResultsTable({ jurorData, onSaveJuror }) {
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

  const handleSaveJuror = async (updatedJuror) => {
    // patch the juror
    let url = `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/api/admin/juror/edit/${updatedJuror._id}`;
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJuror),
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Juror updated successfully");
        console.log(data);
        // Update the jurorData with the updated juror
        onSaveJuror(data);
        setSelectedJuror(data);
      } else {
        console.error("Error updating juror");
      }
    } catch (error) {
      console.error("Error: ", error);
    }

    // close the modal
    handleCloseModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    
    >
      <div className="mx-1 p-2 max-w-full">
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
                        onPress={() => handleViewDetails(juror)}
                      ></Link>
                    </Tooltip>

                    <Tooltip showArrow={true} content="Edit">
                      <Link
                        anchorIcon={<BsPencilSquare />}
                        showAnchorIcon
                        isBlock
                        onPress={() => handleEditJuror(juror)}
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
    </motion.div>
  );
}

export default SearchResultsTable;
