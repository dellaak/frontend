import React, { useRef, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../views/profilePage/itemType";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import "./style.scss";

export const Social = ({ social, username, id, index, moveCard, editMode }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [newSocialVal, setNewSocialVal] = useState(
    social && social.url ? social.url : social.username
  );
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.BOX, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const [act, setAct] = useState(false);

  useEffect(() => {
    if (editMode) {
      setAct(true);
    } else {
      setAct(false);
    }
  }, [editMode]);

  const deleteSocial = () => {
    dispatch(actions.deleteSocialItem(social.title, username));

    setOpenDelete(false);
  };

  const editSave = () => {
    const data = {
      title: social.title,
      username: !social.url ? newSocialVal: null ,
      url: social.url ? newSocialVal : null,
    };

    dispatch(actions.updateSocialItem(data));
    dispatch(actions.getPublicUser())
    setOpenEdit(false);
  };

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClickEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };
  useEffect(() => {}, []);

  return (
    <>
      <Grid
        item
        md={3}
        xs={6}
        className={editMode ? "active-grid-social" : "social-wrapper"}
        edit={editMode ? 1 : undefined}
      >
        <small>{social.title}</small>
        {editMode && (
          <img
            className="social-icon-active"
            src={social.icon}
            alt="logo"
            ref={ref}
          />
        )}
        <div className="bottom-wrap-social">
          {editMode && (
            <EditIcon
              className="edit-social-icon"
              onClick={() => {
                handleClickEdit();
                setSelectedSocial(social);
              }}
            />
          )}
          {editMode && (
            <DeleteForeverIcon
              className="delete-edit-icon"
              onClick={() => {
                handleClickOpen();
                setSelectedSocial(social);
              }}
            />
          )}
        </div>
        {!editMode && (
          <a className="social-link" href={social.link} target="_blank">
            <img className="social-icon" src={social.icon} alt="logo" />
          </a>
        )}

        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete media from profile"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove your{" "}
              {selectedSocial && selectedSocial.title} from your profile ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteSocial} color="primary" autoFocus>
              Delete {selectedSocial && selectedSocial.title}
            </Button>
          </DialogActions>
        </Dialog>

        {/* EDIT */}
        <Grid item md={10}>
          <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            className="edit-dialog"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Edit {selectedSocial && selectedSocial.title}
            </DialogTitle>
            <DialogContent>
              <TextField
                value={newSocialVal}
                className="edit-field"
                label={social.url ? "Social url" : "Social name"}
                onChange={(e)=>{setNewSocialVal(e.target.value)}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button onClick={editSave} color="primary" autoFocus>
                Save change
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
