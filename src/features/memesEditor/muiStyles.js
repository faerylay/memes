import { makeStyles } from '@mui/styles';

export default makeStyles({
  canvasPaper: {
    position: 'relative',
    border: 1,
    color: '#fff',
    marginBottom: 4,
  },
  canvasBox: {
    height: 350,
    position: 'relative',
    padding: 3
  },
  canvasParent: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  canvas: {
    borderRadius: 3,
    border: 1,
    borderColor: 'grey',
    borderStyle: 'dotted'
  },


  bottomTabs: {
    display: 'flex',
    marginRight: 5,
    marginBottom: 5
  },



  memesApi: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  memesBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: '48%',
    border: 1,
    borderColor: 'silver',
    borderStyle: 'solid',
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 5,
    padding: 3,
    cursor: 'pointer'
  },
  memesTitle: {
    padding: 0,
    margin: 0,
    alignSelf: 'center',
    fontSize: 8
  },
  imgBox: {
    height: '80%',
    padding: 0,
    margin: 0,
  },
  memesImg: {
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
  },


  input: {
    width: '100%',
    height: 40,
    paddingLeft: 10
  },
  inputFile: {
    display: 'none'
  },
  fileUpload: {
    display: 'flex',
    cursor: 'pointer'
  },




});

