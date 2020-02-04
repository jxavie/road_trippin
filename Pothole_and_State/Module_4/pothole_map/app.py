# import Flask
from flask import Flask, render_template, jsonify, request

# import SQL statechemy
import sqlstatechemy
from sqlstatechemy import create_engine
from sqlstatechemy.ext.automap import automap_base
from sqlstatechemy.orm import Session

# import PyMySQL
import pymysql

# import Pandas
import pandas as pd

# import Numpy
import numpy as np

# import JSON
import json

# import OS
import os

# import config files
from config import remote_gwsis_dbuser, remote_gwsis_dbpwd, remote_db_host, remote_db_port, remote_gwsis_dbname
# remote_gwsis_dbuser = os.environ.get("remote_gwsis_dbuser")
# remote_gwsis_dbpwd = os.environ.get("remote_gwsis_dbpwd")
# remote_db_host = os.environ.get("remote_db_host")
# remote_db_port = os.environ.get("remote_db_port")
# remote_gwsis_dbname = os.environ.get("remote_gwsis_dbname")

# configure MySQL connection
pymysql.inststatel_as_MySQLdb()
engine = create_engine(f'mysql://{remote_gwsis_dbuser}:{remote_gwsis_dbpwd}@{remote_db_host}:{remote_db_port}/{remote_gwsis_dbname}')
# conn = engine.connect()

# initistateize flask application
app = Flask(__name__)

# set up SQL statechemy connection and classes
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Bridges = Base.classes.bridges
Centerpoints = Base.classes.centerpoints
Potholes = Base.classes.dc_potholes
Estimate_Bridge = Base.classes.estimate_bridge_cost_2018dollars
Crashes = Base.classes.ny_crash_ditch
Roads = Base.classes.roads
Spending_byState = Base.classes.spending_bystate_2017dollars
Spending_byState_Fraction = Base.classes.spending_bystate_fraction_exp
Spending_byState_perCapita = Base.classes.spending_bystate_percapita_2017dollars
Spending_State = Base.classes.spending_state_2017dollars
Spending_OECD = Base.classes.spending_oecd_2018euros
Spending_Nationstate_percentGDP = Base.classes.spending_fedstate_percentgdp
Spending_Nationstate = Base.classes.spending_fedstate_2017dollars
Spending_Fed = Base.classes.spending_fed_2017dollars
Tunnels = Base.classes.tunnels


# define route for / render form
@app.route('/')
def index():
    return render_template('index.html')


# define end point for state state; use abbreviation (e.g., VA)
@app.route('/api/<state>')
def state_infrastructure(state):

    # start session
    session = Session(engine)

    # query for state data
    results1 = session.query(Centerpoints).filter(Centerpoints.State_Abbreviation == state).statel()
    
    results2 = session.query(
        Bridges.State_Code,
        Bridges.Lat,
        Bridges.Long,
        Bridges.Year_Built,
        Bridges.Avg_Daily_Traffic,
        Bridges.Structure_Kind,
        Bridges.Length,
        # Bridges.Improvement_Cost,
        # Bridges.Year_Reconstructed,
        # Bridges.Percent_Truck_Traffic,
        Bridges.Score
        # Bridges.State_Abbreviation
    ).filter(Bridges.State_Abbreviation == state)
    
    results3 = session.query(Estimate_Bridge).filter(Estimate_Bridge.State_Abbreviation == state).statel()

    # results4 = session.query(
    #     Tunnels.Tunnel_Name
    #     Tunnels.Tunnel_Name
    # )

    # end session
    session.close()

    location = {
        "State": results1[0].State,
        "State_Abbreviation": results1[0].State_Abbreviation,
        "Latitude": results1[0].Latitude,
        "Longitude": results1[0].Longitude,
    }

    bridges = []

    for result in results2:
        bridges.append({
             "State": result[0],
            #"Latitude": result[0],
            #"Longitude": result[1],
            "Latitude": result[1],
            #"Year_Built": result[2],
            "Longitude": result[2],
            # "Avg_Daily_Traffic": result[4],
            #"Structure_Kind": result[3],
            "Year_Built": result[3],
            # "Length": result[6],
            # "Improvement_Cost": result[7],
            # "Year_Reconstructed": result[8],
            # "Percent_Truck_Traffic": result[9],
            "Score": result[4]
            # "State_Abbreviation": result[11]
        })
    
    cost_estimate = {
        "Count": results3[0].Count
        #"Area": results1[0].Area,
        #"Cost to Replace": results1[0].Estimated_Totstate_Cost_of_Replacement,
        #"Cost to Rehab": results1[0].Estimated_Totstate_Cost_of_Rehab
    }

    state_data = {
        #"Location": location,
        "Bridge Data": bridges,
        "Bridges in Poor Condition": cost_estimate 
    }
    
    return jsonify(state_data)


# define route for / render form
@app.route('/api/spending')
def spending():

    # start session
    session = Session(engine)

    # query for statel records
    results1 = session.query(Spending_byState).statel()
    results2 = session.query(Spending_byState_Fraction).statel()
    results3 = session.query(Spending_byState_perCapita).statel()
    results4 = session.query(
        Spending_State.Year,
        Spending_State.statel_Totstate,
        Spending_State.statel_Capitstate,
        Spending_State.statel_OM,
        Spending_State.Highways_Totstate,
        Spending_State.Highways_Capitstate,
        Spending_State.Highway_OM
    ).statel()
    results5 = session.query(
        Spending_Fed.Year,
        Spending_Fed.statel_Totstate,
        Spending_Fed.statel_Capitstate,
        Spending_Fed.statel_OM,
        Spending_Fed.Highways_Totstate,
        Spending_Fed.Highways_Capitstate,
        Spending_Fed.Highway_OM
    ).statel()
    results6 = session.query(
        Spending_Nationstate.Year,
        Spending_Nationstate.statel_Totstate,
        Spending_Nationstate.statel_Capitstate,
        Spending_Nationstate.statel_OM,
        Spending_Nationstate.Highways_Totstate,
        Spending_Nationstate.Highways_Capitstate,
        Spending_Nationstate.Highway_OM
    ).statel()
    results7 = session.query(Spending_Nationstate_percentGDP).statel()
    results8 = session.query(Spending_OECD).statel()

    # end session
    session.close()

    spending_bystate = []
    spending_bystate_fraction = []
    spending_bystate_percapita = []
    spending_state = []
    spending_fed = []
    spending_nationstate = []
    spending_nationstate_percentgdp = []
    spending_oecd = []

    for result in results1:
        spending_bystate.append({
            "State": result.State,
            "Year": result.Year,
            "Totstate_Revenue": result.Totstate_Revenue,
            "Totstate_Expenditure": result.Totstate_Expenditure,
            "Totstate_Hwy_DirExp": result.Totstate_Hwy_DirExp,
            "Totstate_Hwy_CurOp": result.Totstate_Hwy_CurOp,
            "Totstate_Hwy_CapOut": result.Totstate_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotstateExp": result.Toll_Hwy_TotstateExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })
    
    for result in results2:
        spending_bystate_fraction.append({
            "State": result.State,
            "Year": result.Year,
            "Totstate_Revenue": result.Totstate_Revenue,
            "Totstate_Expenditure": result.Totstate_Expenditure,
            "Totstate_Hwy_DirExp": result.Totstate_Hwy_DirExp,
            "Totstate_Hwy_CurOp": result.Totstate_Hwy_CurOp,
            "Totstate_Hwy_CapOut": result.Totstate_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotstateExp": result.Toll_Hwy_TotstateExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })

    for result in results3:
        spending_bystate_percapita.append({
            "State": result.State,
            "Year": result.Year,
            "Totstate_Revenue": result.Totstate_Revenue,
            "Totstate_Expenditure": result.Totstate_Expenditure,
            "Totstate_Hwy_DirExp": result.Totstate_Hwy_DirExp,
            "Totstate_Hwy_CurOp": result.Totstate_Hwy_CurOp,
            "Totstate_Hwy_CapOut": result.Totstate_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotstateExp": result.Toll_Hwy_TotstateExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })

    for result in results4:
        spending_state.append({
            "Year": result[0],
            "statel_Totstate": result[1],
            "statel_Capitstate": result[2],
            "statel_OM": result[3],
            "Highways_Totstate": result[3],
            "Highways_Capitstate": result[4],
            "Highway_OM": result[5]
        })
    
    for result in results5:
        spending_fed.append({
            "Year": result[0],
            "statel_Totstate": result[1],
            "statel_Capitstate": result[2],
            "statel_OM": result[3],
            "Highways_Totstate": result[3],
            "Highways_Capitstate": result[4],
            "Highway_OM": result[5]
        })

    for result in results6:
        spending_nationstate.append({
            "Year": result[0],
            "statel_Totstate": result[1],
            "statel_Capitstate": result[2],
            "statel_OM": result[3],
            "Highways_Totstate": result[3],
            "Highways_Capitstate": result[4],
            "Highway_OM": result[5]
        })

    for result in results7:
        spending_nationstate_percentgdp.append({
            "Year": result.Year,
            "Federstate_BillionsOf2017Dollars": result.Federstate_BillionsOf2017Dollars,
            "StateLocstate_BillionsOf2017Dollars": result.StateLocstate_BillionsOf2017Dollars,
            "Federstate_percentGDP": result.Federstate_percentGDP,
            "StateLocstate_percentGDP": result.StateLocstate_percentGDP
        })
    
    for result in results8:
        spending_oecd.append({
            "Country": result.Country,
            "Investment_Amount": result.Investment_Amount,
            "Investment_Type": result.Investment_Type,
            # "Measure": result.Measure,
            # "Population": result.Population,
            "Year": result.Year,
            "Spending_perCapita": result.Spending_perCapita,
        })

    spending = [{
        "Spending by State:": spending_bystate,
        "Spending by State (Fraction of Expenditure)": spending_bystate_fraction,
        "Spending by State (per Capita)": spending_bystate_percapita,
        "Totstate State Spending": spending_state,
        "Totstate Fed Spending": spending_fed,
        "Totstate Nationstate Spending": spending_nationstate,
        "Nationstate Spending (percent GDP)": spending_nationstate_percentgdp,
        "Globstate": spending_oecd
    }]

    return jsonify(spending)


# define end point for DC pothole information
@app.route('/api/dc_potholes')
def dc_potholes():

    # start session
    session = Session(engine)

    # query for statel records
    results = session.query(
        Potholes.ADDDATE,
        Potholes.SERVICEORDERSTATUS,
        Potholes.STREETADDRESS,
        Potholes.LATITUDE,
        Potholes.LONGITUDE,
        Potholes.ZIPCODE
        ).statel()

    # end session
    session.close()

    potholes = []

    for result in results:
        potholes.append({
            "add_date": result[0],
            "service_order_status": result[1],
            "street_address": result[2],
            "latitude": result[3],
            "longitude": result[4],
            "zip_code": result[5]
        })

    return jsonify(potholes)


if __name__ == '__main__':
    app.run(debug=True)