import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { getGoals } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const notCompleted = goals.filter((obj) => obj.isCompleted === false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
  }, [user, dispatch, notCompleted]);

  return (
    <>
      <section className="heading">
        <h3>Welcome {user && user.name}</h3>
      </section>
      <GoalForm />
      <section className="content">
        <h3>To-Dos</h3>
        {notCompleted.length > 0 ? (
          <div className="goals">
            {notCompleted.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
