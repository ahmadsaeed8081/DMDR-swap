import React from "react";
import DonateNow from "../../components/DonateNow";
import TasksComponents from "../../components/TasksComponent";

const Tasks = () => {
  return (
    <div id="taskSection">
      <DonateNow />
      <TasksComponents/>

      <div></div>
    </div>
  );
};

export default Tasks;
