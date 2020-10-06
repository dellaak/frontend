import React, {  useEffect, useState } from "react";
import { Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style.scss";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import WhatshotIcon from "@material-ui/icons/Whatshot";

export const PublicHighlight= ({ list}) => {
  const [highList, setHighList] = useState([]);
  const [open,setOpen] = useState({open:false,item:null})
  
  useEffect(() => {
    if (list) {
      setHighList(list);
    }
  }, [list]);


  useEffect(() => {

  }, [open]);




const handleClose = () =>{
  setOpen({open:false,item:null})
}


  const MyComp = ({ item, style }) => {
    style = {
      ...style,
      paddingLeft:'10px',
      borderBottom: "1px solid #fbb542",
      display: "flex",
      alignItems: "center",
      color: "white",
      fontFamily: "Baloo Tamma 2, cursive",
      fontSize: "1rem",
      flex: 1,
    };

    if (item.url) {
      item.url = item.url.replace(/\/$/, "");

      // run against regex
      const matches = item.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      // extract hostname (will be null if no match is found)
      const favurl = matches && matches[1];
      
      return (
        <div style={style}>
          <a href={item.url} target="_blank" className="single-highlight-row">
            <img
              className="highlight-icon"
              src={item.url ? "https://" + favurl + "/favicon.ico" : ""}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/socialicons/fallback.svg";
              }}
            />
           <p className="item-text-hs">{item.text}</p>
          </a>
        
        </div>
      );
    } else if (item.social && item.social.link) {
      return (
        <div style={style}>
          <a
            className="single-highlight-row"
            href={item.social.link}
            target="_blank"
          >
            <img className="highlight-icon" src={item.social.icon} />
            <p className="item-text-hs">{item.text}</p>
          </a>
        
        </div>
      );
    }  else if (item.social.phone) {
      return (
        <div style={style}>
          <div onClick={()=>{setOpen({open:true, item:item.social})}} className="list-wrap-phone">
            <img className="highlight-icon" src={item.social.icon} />
            <p className="item-text-hs">{item.text}</p>
            </div>
         
        </div>
      );
    }else if (item.social.socialid) {
      return (
        <div style={style}>
          <div onClick={()=>{setOpen({open:true, item:item.social})}} className="list-wrap-phone">
            <img className="highlight-icon" src={item.social.icon} />
            <p className="item-text-hs">{item.text}</p>
            </div>
          
        </div>
      );
    }else {
      return null;
    }
  };

  const Row = ({ data, index, style }) => {
    let item = data[index];

    return <MyComp item={item} style={style} />;
  };

  return (
    <>
      {highList && highList.length !== 0 ? (<>
        <div className="wrap-window">
          <div className="fixed-top-window">
            <WhatshotIcon className="hot-icon" />
            <span>Highlights</span>
          </div>
          <AutoSizer className="sizer">
            {({ height, width }) => (
              <List
                itemData={highList}
                className="List"
                height={height}
                itemCount={highList.length}
                itemSize={75}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
                <Dialog
                open={open.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Highlight information"}
                </DialogTitle>
                <DialogContent>
                 
                  {open.item && open.item.phone && <p> Number: <b> {open.item &&open.item.phone}</b></p>}
                  {open.item && open.item.socialid && <p> Socialid: <b> {open.item &&open.item.socialid}</b></p>}
             
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              </>
      ) : (
       ''
      )}
    </>
  );
};
