import { AddTodoModalProps, todos } from "../model";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function AddTodoModal({ isOpen, handleToggle, handleAdd, isEdit = false, data }: AddTodoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues
  } = useForm<todos>({
    defaultValues: {
      date: new Date(),
      isDone: false,
    },
  });

  const onSubmitForm = (data: todos) => {
    handleAdd(data)
    handleCancel()
  };

  const handleCancel = () => {
    handleToggle();
    setValue('title', '')
    setValue('date', new Date())
    clearErrors()
  };

  useEffect(() => {
    if(isEdit){
      if(data){
        setValue('title', data?.title)
        setValue('date', data?.date)
        setValue('isDone', data?.isDone)
        setValue('id', data?.id)
      }
    }
  }, [data, isEdit, setValue])

  return (
    <Dialog open={isOpen} sx={{ overflow: "visible" }}>
      <DialogTitle>
        <Typography variant="h6" fontWeight={700}>
          Add ToDo
        </Typography>
        <IconButton
          sx={{
            padding: "0px !important",
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
          onClick={() => handleCancel()}
        >
          <AiOutlineClose size={21} color="lightgrey" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ overflow: "visible" }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{ marginBottom: "10px" }}
            {...register("title", { required: true })}
            error={Boolean(errors?.title)}
            helperText={Boolean(errors?.title) ? "Title is Required" : ''}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginBottom: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
            required
            value={dayjs(getValues('date')).format("YYYY-MM-DD")}
            {...register("date", { required: true })}
            error={Boolean(errors?.date)}
            helperText={Boolean(errors?.date) ? "Date is Required" : ''}
          />
        <Grid container spacing={2} sx={{marginTop: '10px'}}>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant="outlined" onClick={() => handleSubmit(onSubmitForm)()}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddTodoModal;
