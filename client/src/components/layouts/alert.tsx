import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "../../store/actions/alerts";
import { AppState } from "../../store/configureStore";
import { AlertType } from "../../global.types";

function Alert({ alerts, removeAlert }: AlertProps) {
	return (
		<div className="container my-2">
			{alerts.length < 0
				? null
				: alerts.map((alert: AlertType) => (
						<div
							className={`alert alert-${alert.alertType} text-center`}
							key={alert.id}
							onClick={() => removeAlert(alert.id)}
						>
							{alert.msg}
						</div>
				  ))}
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(Alert);

interface AlertProps {
	alerts: AlertType[];
	removeAlert: typeof removeAlert;
}
