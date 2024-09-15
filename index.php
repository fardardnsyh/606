<?php include "common/head.php";?>
<?php include "common/header.php";?>
<!-- Begin page content -->
<div class="container body-container">
	<div class="calendar-container">
		<header>
		<button type="button" style="float: right;margin-top: -33px;margin-right: -20px;" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#fullCalendar">Full View</button>
			<div class="row">
				<div class="col-md-6 text-center"    style="border-right: white solid;">
					<div class="dayH"></div>
					<div class="monthH"></div>
				</div>
				<div class="col-md-6">
					<div id="weatherWidget"></div>
				</div>
			</div>
		</header>
		<div id="calendar"></div>
		
		<div class="ring-left"></div>
		<div class="ring-right"></div>
	</div>
</div>
<!-- Modals and Popups -->
<div class="modal modal-fade" id="event-modal" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">
					Event
				</h4>
			</div>
			<div class="modal-body">
				<input type="hidden" name="event-index" value="">
				<form class="form-horizontal">
					<div class="form-group">
						<label for="min-date" class="col-sm-4 control-label">Name</label>
						<div class="col-sm-7">
							<input name="event-name" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group">
						<label for="min-date" class="col-sm-4 control-label">Location</label>
						<div class="col-sm-7">
							<input name="event-location" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group">
						<label for="min-date" class="col-sm-4 control-label">Dates</label>
						<div class="col-sm-7">
							<div class="input-group input-daterange" data-provide="datepicker">
								<input id="mDate" name="event-start-date" type="text" class="form-control" value="2012-04-05">
								<span class="input-group-addon">to</span>
								<input id="mxDate" name="event-end-date" type="text" class="form-control" value="2012-04-19">
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="min-time" class="col-sm-4 control-label">Times</label>
						<div class="col-sm-7">
							<div class="input-group date">
								<input name="event-start-time" id='datetimepickerst' type="text" class="form-control">
								<span class="input-group-addon">to</span>
								<input name="event-end-time" id='datetimepickeren' type="text" class="form-control">
								<span class="input-group-addon">
                        			<span class="glyphicon glyphicon-time"></span>
                    			</span>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary" id="save-event">
					Save
				</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="fullCalendar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Calendar - Full View</h4>
      </div>
      <div class="modal-body">
        <div id="calendarFull"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<?php include "common/footer.php";?>