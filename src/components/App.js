import React from 'react';
import './App.css';

import {Card, Container, Row, Col} from 'react-bootstrap';

import ControlPanel from "./ControlPanel";
import WorkersTable from "./WorkersTable";

import Messages from "../common/Messages";
import WebWorkerPool from "../workers/WebWorkerPool";

// import Configuration from "../common/Configuration";
// import IsArraySorted from "../algorithm/IsArraySorted";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workers: [],
            interval: 250,
            started: false,
            workersCount: 1
        }
    };

    handleStartButtonClick() {
        // const array = Array.from({length: Configuration.ARRAY_SIZE}, (v, k) => Math.floor((Math.random() * Configuration.ARRAY_SIZE) + k));
        //
        // this.worker = WebWorker();
        // this.worker.postMessage({message: Messages.START, array: array});

        const workersCount = this.state.workersCount;
        let workers = [...Array(workersCount).keys()].map((n) => ({
            id: n,
            progress: 0,
            status: "Working",
            message: "0"
        }));

        this.webWorkerPool = new WebWorkerPool();
        this.webWorkerPool.start(workersCount);

        this.setState(
            {
                started: true,
                workers: workers
            });


        // const self = this;
        // this.worker.onmessage = function (e) {
        //     if (e.data.message === Messages.PROGRESS) {
        //         self.setState({progress: e.data.value});
        //         self.setState({message: e.data.value});
        //     } else if (e.data.message === Messages.FINISHED) {
        //         self.setState({status: "Finished " + e.data.value.length});
        //         self.worker.terminate();
        //         console.log(IsArraySorted.check(e.data.value));
        //         self.setState({message: e.data.value.length});
        //     } else
        //         self.setState({status: e.data.message});
        // };

        // this.clock = setInterval(function () {
        //     self.worker.postMessage({
        //         message: Messages.ADD_NUMBER,
        //         value: Math.floor((Math.random() * Configuration.ARRAY_SIZE))
        //     });
        // }, this.state.interval);
    };

    handleStopButtonClick() {
        // this.worker.terminate();
        // clearInterval(this.clock);
        this.webWorkerPool.stop();
        this.setState({started: false});
    };

    handleIntervalChange(event) {
        this.setState({interval: event.target.value});
    };

    handleWorkersCountChange(event) {
        this.setState({workersCount: parseInt(event.target.value)});
    };

    pauseProcessing() {
        this.worker.postMessage({message: Messages.PAUSE});
    };

    resumeProcessing() {
        this.worker.postMessage({message: Messages.RESUME});
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col/>
                    <Col sm={9}>
                        <Card>
                            <Card.Header>Web Worker Sorting</Card.Header>
                            <Card.Body>
                                <ControlPanel
                                    onStartButtonClick={() => this.handleStartButtonClick()}
                                    onStopButtonClick={() => this.handleStopButtonClick()}
                                    onIntervalChange={(e) => this.handleIntervalChange(e)}
                                    onWorkersCountChange={(e) => this.handleWorkersCountChange(e)}

                                    hasStarted={this.state.started}
                                    newNumberInterval={this.state.interval}
                                    workersCount={this.state.workersCount}
                                />
                                <br/>
                                {this.state.started &&
                                <WorkersTable workers={this.state.workers}/>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

export default App;
