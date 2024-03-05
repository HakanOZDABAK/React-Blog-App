import { ManageAccounts } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import { Button, Drawer, Fade, Popper, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Bounce, toast } from "react-toastify";
import { PostServices } from "../service/PostServices";
import { usePostStore } from "../store/usePostStore";
import { useUserStore } from "../store/useUserStore";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [image, setImage] = React.useState<any>();
  const [postMessage, setPostMessage] = React.useState<any>("");
  const [postName, setPostName] = React.useState<any>("");
  const { userId, userName, token } = useUserStore();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const { setPosts } = usePostStore();
  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popper" : undefined;
  type Anchor = "top" | "left" | "bottom" | "right";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const handlePostNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(e.target.value);
  };
  const handlePostDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostMessage(e.target.value);
  };

  const addPost = async () => {
    const userData = {
      postName: postName,
      postDetail: postMessage,
      user: {
        blogUserId: userId,
        profileName: userName,
      },
    };

    try {
      let postServices = new PostServices();
      await postServices.addPost(userData, token);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedPosts = await postServices.getAllPosts(token);
      setPosts(updatedPosts);

      console.log("Post Added and Posts Updated:", updatedPosts);

      toast.success("Post Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImageChange = (event: any) => {
    // Seçilen resmi state'e ayarla
    setImage(event.target.files[0]);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            {(["left"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <MenuIcon onClick={toggleDrawer(anchor, true)} />
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  HELLO GUYSSSS
                </Drawer>
              </React.Fragment>
            ))}
          </IconButton>
          <StyledFab
            color="secondary"
            aria-label="add"
            onClick={handleClick}
          ></StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ManageAccounts />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
          <Popper id={popperId} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                  <span>Add a New Post:</span>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="outlined-multiline-flexible-postName"
                        label="Your Message Name"
                        multiline
                        maxRows={4}
                        value={postName}
                        onChange={handlePostNameChange}
                      />
                      <TextField
                        id="outlined-multiline-flexible-postDetail"
                        label="Your Message"
                        multiline
                        maxRows={4}
                        value={postMessage}
                        onChange={handlePostDetailChange}
                      />
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleImageChange}
                        />
                      </Button>
                    </div>
                  </Box>
                  <Button
                    disabled={postMessage.length === 0}
                    variant="contained"
                    color="success"
                    endIcon={<SendIcon />}
                    onClick={() => addPost()}
                  >
                    Post It!
                  </Button>
                </Box>
              </Fade>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
