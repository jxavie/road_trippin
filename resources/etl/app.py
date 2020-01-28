# import Flask
from flask import Flask, render_template, jsonify, request

# import SQL Alchemy
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# import PyMySQL
import pymysql

# import Pandas
import pandas as pd

# import JSON
# import json

# import OS
import os

# import config files
# from config import remote_gwsis_dbuser, remote_gwsis_dbpwd, remote_db_endpoint, remote_db_port, remote_gwsis_dbname
remote_gwsis_dbuser = os.environ.get("remote_gwsis_dbuser")
remote_gwsis_dbpwd = os.environ.get("remote_gwsis_dbpwd")
remote_db_endpoint = os.environ.get("remote_db_endpoint")
remote_db_port = os.environ.get("remote_db_port")
remote_gwsis_dbname = os.environ.get("remote_gwsis_dbname")

# configure MySQL connection
pymysql.install_as_MySQLdb()
engine = create_engine(f'mysql://{remote_gwsis_dbuser}:{remote_gwsis_dbpwd}@{remote_db_endpoint}:{remote_db_port}/{remote_gwsis_dbname}')
# conn = engine.connect()

# initialize flask application
app = Flask(__name__)

# set up SQL Alchemy connection and classes
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Client = Base.classes.client_info_fed
TPOC = Base.classes.tpoc_info_fed
Traveler = Base.classes.traveler_info_fed
Employee = Base.classes.fsde_employees_df
Training = Base.classes.employee_training
Task = Base.classes.pre_deployment_tasks


# define route for / render form
@app.route('/')
def index():
    return render_template('index.html')


# define route for processing form input
@app.route('/post', methods=['GET','POST'])
def process_form_data():
    
    if request.method == 'POST':

        req = request.form

        try:

            Industry_Partner = req['industry_partner']
            Client_Id = req['client_id']
            Version_Date = req['version_date']
            Travel_No = req['travel_no']
            Dt = req['dt']
            Project_Name = req['project_name']
            Project_ID_IA_No = req['project_id']
            Contract_Task_Order = req['contract_task_order']
            
            From_Requestor = req['from_requestor']
            Through = req['client_id']
            Funding_Stream = req.get('funding_stream')
            Subject_ID = req['subject_id']
            Cum_Amt_Billed = req['cum_amt_billed']
            Cum_Amt_Billed_Balance = req['cum_amt_billed_balance']
            Estimate = req['estimate']
            Estimate_Balance = req['estimate_balance']

            Client_POC = req['client_poc']
            ID_Project_Mgr = req['id_project_mgr']
            Travel_Justification = req['travel_justification']
            First_Name = req['first_name']
            Middle_Name = req['middle_name']
            Last_Name = req['last_name']
            Company = req['company']
            Sub_Company_POC_Name = req['sub_company_poc_name']
            Sub_Company_Address = req['sub_company_address']
            Sub_Company_City = req['sub_company_city']
            Sub_Company_Phone = req['sub_company_phone']
            Sub_Company_email = req['sub_company_email']
            Sub_Company_PO = req['sub_company_po']
            
            Birth_Date = req['birth_date']
            Place_Of_Birth = req['place_of_birth']
            SSN = req['ssn']
            DOD_ID = req['dod_id']
            Passport_No = req['passport_no']
            Passport_Expiration = req['passport_expiration']
            Employee_ID = req['employee_id']
            Date_Hired = req['date_hired']
            Position_Type = req['position_type']
            Primary_Phone = req['primary_phone']
            Secondary_Phone = req['secondary_phone']
            Primary_Email = req['primary_email']
            Secondary_Email = req['secondary_email']
            Task_ID = req['task_id']
            Manager = req['manager']
            OY2_PO_CODE = req['oy2_po_code']
            OY2_Org_Code = req['oy2_org_code']
            OY2_Project_String = req['oy2_project_string']
            PLC_Code = req['plc_code']
            NOK_Date = req['nok_date']
            FSDE_Sheet_Date = req['fsde_sheet_date']
            Deployment_Start_Date = req['deployment_start_date']
            Deployment_End_Date = req['deployment_end_date']
            Leave_Start_Date = req['leave_start_date']
            Leave_End_Date = req['leave_end_date']
            Mil_Leave_Start_Date = req['mil_leave_start_date']
            Mil_Leave_End_Date = req['mil_leave_end_date']
            
            DITAC = req['ditac']
            SIS = req['sis']
            FTP = req['ftp']
            JASA = req['jasa']
            DST_OSINT = req['dst_osint']
            PROTON = req['proton']
            FMV_Academy = req['fmv_academy']
            
            CCM_Submit = req['ccmsubmit']
            CI_Brief = req['ci_brief']
            Visa_Submitted = req['visa_submitted']
            SRC_Date = req['src_date']
            SRC_Travel_Submission = req['src_travel_submission']
            Deployment_Travel_Submission = req['deployment_travel_submission']
        
        except Exception as e:
            print(e) 
        
        record_client = Client(
            Employee_ID = Employee_ID,
            Task_ID = Task_ID,
            Industry_Partner = Industry_Partner,
            Client_Id = Client_Id,
            Version_Date = Version_Date,
            Travel_No = Travel_No,
            Dt = Dt,
            Project_Name = Project_Name,
            Project_ID_IA_No = Project_ID_IA_No,
            Contract_Task_Order = Contract_Task_Order
        )
        
        record_tpoc = TPOC(
            From_Requestor = From_Requestor,
            Through = Through,
            Funding_Stream = Funding_Stream,
            Subject_ID = Subject_ID,
            Cum_Amt_Billed = Cum_Amt_Billed,
            Cum_Amt_Billed_Balance = Cum_Amt_Billed_Balance,
            Estimate = Estimate,
            Estimate_Balance = Estimate_Balance,
            Employee_ID = Employee_ID      
        )

        record_traveler = Traveler(
            Employee_ID = Employee_ID,
            Client_POC = Client_POC,
            ID_Project_Mgr = ID_Project_Mgr,
            Travel_Justification = Travel_Justification,
            Last_Name = Last_Name,
            First_Name = First_Name,
            Company = Company,
            Sub_Company_POC_Name = Sub_Company_POC_Name,
            Sub_Company_Address = Sub_Company_Address,
            Sub_Company_City = Sub_Company_City,
            Sub_Company_Phone = Sub_Company_Phone,
            Sub_Company_email = Sub_Company_email,
            Sub_Company_PO = Sub_Company_PO,
        )

        record_employee = Employee(
            Employee_ID = Employee_ID,
            Task_ID = Task_ID,
            Last_Name = Last_Name,      
            First_Name = First_Name,
            Middle_Name = Middle_Name,    
            Birth_Date = Birth_Date,
            Place_Of_Birth = Place_Of_Birth,
            Company = Company,
            Date_Hired = Date_Hired,
            OY2_PO_CODE = OY2_PO_CODE,
            OY2_Org_Code = OY2_Org_Code,
            NOK_Date = NOK_Date,
            FSDE_Sheet_Date = FSDE_Sheet_Date,
            Position_Type = Position_Type,
            Deployment_Start_Date = Deployment_Start_Date,
            Deployment_End_Date = Deployment_End_Date,
            Leave_Start_Date = Leave_Start_Date,
            Leave_End_Date = Leave_End_Date,
            Mil_Leave_Start_Date = Mil_Leave_Start_Date,
            Mil_Leave_End_Date = Mil_Leave_End_Date,
            OY2_Project_String = OY2_Project_String,
            PLC_Code = PLC_Code,
            Manager = Manager,
            DOD_ID = DOD_ID,
            SSN = SSN,
            Primary_Phone = Primary_Phone,
            Secondary_Phone = Secondary_Phone,
            Primary_Email = Primary_Email,
            Secondary_Email = Secondary_Email,
            Passport_No = Passport_No,
            Passport_Expiration = Passport_Expiration
        )

        record_training = Training(
            Employee_ID = Employee_ID,
            DITAC = DITAC,
            SIS = SIS,
            FTP = FTP,
            JASA = JASA,
            DST_OSINT = DST_OSINT,
            PROTON = PROTON,
            FMV_Academy = FMV_Academy
        )

        record_tasks = Task(
            Employee_ID = Employee_ID,
            Deployment_Start_Date = Deployment_Start_Date,
            CCM_Submit = CCM_Submit,
            CI_Brief = CI_Brief,
            Visa_Submitted = Visa_Submitted,
            SRC_Date = SRC_Date,
            SRC_Travel_Submission = SRC_Travel_Submission,
            Deployment_Travel_Submission = Deployment_Travel_Submission
        )
        
        # start session
        session = Session(engine)

        # add records to DB session
        # session.add_all(record_client, record_tpoc, record_traveler, record_employee, record_training, record_tasks)
        session.add(record_client)
        session.add(record_tpoc)
        session.add(record_traveler)
        session.add(record_employee)
        session.add(record_training)
        session.add(record_tasks)
        
        # commit objects to the database
        session.commit()
        
        # end session
        session.close()

        # return render_tempate('error.html')

    return render_template('success.html', employee_id=Employee_ID)


@app.route('/report')
def report():
    
    # start session
    session = Session(engine)

    try:
        # # query for all records
        # records = session.query(
        #     Employee.Record_Number,
        #     Employee.Employee_ID,
        #     Employee.Last_Name,
        #     Employee.First_Name,
        #     Employee.Company,
        #     Client.Travel_No,
        #     Client.Project_Name,
        #     Client.Project_ID_IA_No,
        #     Client.Contract_Task_Order,
        #     Client.Dt
        #     ).all()

        records = session.execute("SELECT\
                fsde_employees_df.Record_Number,\
                fsde_employees_df.Employee_ID,\
                fsde_employees_df.Last_Name,\
                fsde_employees_df.First_Name,\
                fsde_employees_df.Company,\
                client_info_fed.Travel_No,\
                client_info_fed.Project_Name,\
                client_info_fed.Project_ID_IA_No,\
                client_info_fed.Contract_Task_Order,\
                client_info_fed.Dt\
            FROM fsde_employees_df\
            JOIN client_info_fed \
            ON fsde_employees_df.Record_Number = client_info_fed.Record_Number")

        # # end session
        session.close()

        record_list = []

        for a,b,c,d,e,f,g,h,i,j in records:
            record_dict = {}
            record_dict['01_Record_Number'] = a
            record_dict['02_Employee_ID'] = b
            record_dict['03_Employee_Last_Name'] = c
            record_dict['04_Employee_First_Name'] = d
            record_dict['05_Company'] = e
            record_dict['06_Travel_#'] = f
            record_dict['07_Project_Name'] = g
            record_dict['08_Project_ID/IA_#'] = h
            record_dict['09_Contract/Task_Order'] = i
            record_dict['10_Date'] = j
            record_list.append(record_dict)

        print(records)
    
    except Exception as e:
        print(e)
    
    return render_template('report.html', records=record_list)


if __name__ == '__main__':
    app.run(debug=True)