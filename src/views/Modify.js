/* eslint-disable max-len */
import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Slider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';

const Modify = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    title: ['required', 'minimum 3 characters', 'Unavailable'],
    description: ['minimum 5 characters'],
  };

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      const desc = {
        description: inputs.description,
        filters: sliderInputs,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      console.log('doUpload result', result);
      const tagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id);
      console.log('postTag result', tagResult);
      history.push('/home');
    } catch (e) {
      alert(e.message);
    }
  };
  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
      useUploadForm(doUpload, {
        title: '',
        description: '',
        file: null,
        dataUrl: '',
      });
  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });
  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });
    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs.file]);
  console.log(inputs, sliderInputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
        >
            Upload
        </Typography>
      </Grid>
      <Grid item>
        {!loading ?
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container>
                <Grid container item>
                  <TextValidator
                    fullWidth
                    name="title"
                    label="Title"
                    value={inputs.title}
                    onChange={handleInputChange}
                    validators={validators.title}
                    errorMessages={errorMessages.title}
                  />
                </Grid>
                <Grid container item>
                  <TextValidator
                    fullWidth
                    name="description"
                    label="Description"
                    value={inputs.description}
                    onChange={handleInputChange}
                    validators={validators.description}
                    errorMessages={errorMessages.description}
                  />
                </Grid>
                <Grid container item>
                  <TextValidator
                    fullWidth
                    type="file"
                    name="file"
                    accept="image/*, audio/*, video/*"
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid container item>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Send
                  </Button>
                </Grid>
                {inputs.dataUrl.length > 0 &&
                <>
                  <Grid item xs={8}>
                    <img src={inputs.dataUrl}
                      style={{
                        filter: `brightness(${sliderInputs.brightness}%)
                      contrast(${sliderInputs.contrast}%)
                      saturate(${sliderInputs.saturate}%)
                      sepia(${sliderInputs.sepia}%)`,
                      }}/>
                  </Grid>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography>Brightness</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="brightness"
                        value={sliderInputs?.brightness}
                        onChange={handleSliderChange}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>Contrast</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="contrast"
                        value={sliderInputs?.contrast}
                        onChange={handleSliderChange}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>Saturate</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="saturate"
                        value={sliderInputs?.saturate}
                        onChange={handleSliderChange}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>Sepia</Typography>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        name="sepia"
                        value={sliderInputs?.sepia}
                        onChange={handleSliderChange}/>
                    </Grid>
                  </Grid>
                </>
                }
              </Grid>
            </ValidatorForm> :
            <CircularProgress/>
        }
      </Grid>
    </Grid>
  );
}
;

Modify.propTypes =
  {
    history: PropTypes.object,
  };

export default Modify;
