import React from 'react'
import { Button, Box } from '@mui/material';
import { Redo, Undo } from '@mui/icons-material';

export default function ReUndo({ canvas }) {

  const canvasDemo = (function (canvas) {
    if (!canvas) { return; }
    var _config = {
      canvasState: [],
      currentStateIndex: -1,
      undoStatus: false,
      redoStatus: false,
      undoFinishedStatus: 1,
      redoFinishedStatus: 1,
    };
    canvas.on({
      'object:modified': updateCanvasState,
      'object:added': updateCanvasState,
    });

    function updateCanvasState(opt) {

      if ((_config.undoStatus === false && _config.redoStatus === false)) {
        var jsonData = canvas.toJSON();
        var canvasAsJson = JSON.stringify(jsonData);
        if (_config.currentStateIndex < _config.canvasState.length - 1) {
          var indexToBeInserted = _config.currentStateIndex + 1;
          _config.canvasState[indexToBeInserted] = canvasAsJson;
          var numberOfElementsToRetain = indexToBeInserted + 1;
          _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
        } else {
          _config.canvasState.push(canvasAsJson);
        }
        _config.currentStateIndex = _config.canvasState.length - 1;

      }

    }

    const undo = function () {
      if (_config.undoFinishedStatus) {
        if (_config.currentStateIndex === -1) {
          _config.undoStatus = false;
        }
        else {
          if (_config.canvasState.length >= 1) {
            _config.undoFinishedStatus = 0;
            if (_config.currentStateIndex !== 0) {
              _config.undoStatus = true;
              canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], function () {
                canvas.renderAll();
                _config.undoStatus = false;
                _config.currentStateIndex -= 1;
                _config.undoFinishedStatus = 1;
              });
            }
            else if (_config.currentStateIndex === 0) {
              canvas.clear();
              _config.undoFinishedStatus = 1;
              _config.currentStateIndex -= 1;
            }
          }
        }
      }
    }

    const redo = function () {
      if (_config.redoFinishedStatus) {
        if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length !== 0) {
          _config.redoFinishedStatus = 0;
          _config.redoStatus = true;
          canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function () {
            canvas.renderAll();
            _config.redoStatus = false;
            _config.currentStateIndex += 1;
            _config.redoFinishedStatus = 1;
          });
        }
      }
    }

    return { undo, redo }
  })(canvas);


  return (
    <Box sx={{ display: 'flex', mb: 1 }}>
      <Button color="info" variant="outlined" size="small" onClick={() => canvasDemo.undo()} sx={{ mr: 1 }}>
        <Undo fontSize="small" />
      </Button>

      <Button color="info" variant="outlined" size="small" onClick={() => canvasDemo.redo()}>
        <Redo fontSize="small" />
      </Button>
    </Box>
  )
}








