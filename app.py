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

# import Numpy
import numpy as np

# import JSON
import json

# import OS
import os

# import config files
# from config import remote_gwsis_dbuser, remote_gwsis_dbpwd, remote_db_host, remote_db_port, remote_gwsis_dbname
remote_gwsis_dbuser = os.environ.get("remote_gwsis_dbuser")
remote_gwsis_dbpwd = os.environ.get("remote_gwsis_dbpwd")
remote_db_host = os.environ.get("remote_db_host")
remote_db_port = os.environ.get("remote_db_port")
remote_gwsis_dbname = os.environ.get("remote_gwsis_dbname")
API_KEY = os.environ.get("API_KEY")

# configure MySQL connection
pymysql.install_as_MySQLdb()
engine = create_engine(f'mysql://{remote_gwsis_dbuser}:{remote_gwsis_dbpwd}@{remote_db_host}:{remote_db_port}/{remote_gwsis_dbname}')
# conn = engine.connect()

# initialize flask application
app = Flask(__name__)

# set up SQL Alchemy connection and classes
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Bridge_Summary = Base.classes.bridge_condition_summary
Bridges = Base.classes.bridges
Centerpoints = Base.classes.centerpoints
Potholes = Base.classes.dc_potholes
Estimate_Bridge = Base.classes.estimate_bridge_cost_2018dollars
Crashes = Base.classes.ny_crash_ditch
Road_Summary = Base.classes.road_condition_summary
Roads = Base.classes.roads
Spending_byState = Base.classes.spending_bystate_2017dollars
Spending_byState_Fraction = Base.classes.spending_bystate_fraction_exp
Spending_byState_perCapita = Base.classes.spending_bystate_percapita_2017dollars
Spending_State = Base.classes.spending_state_2017dollars
Spending_OECD = Base.classes.spending_oecd_2018euros
Spending_National_percentGDP = Base.classes.spending_fedstate_percentgdp
Spending_National = Base.classes.spending_fedstate_2017dollars
Spending_Fed = Base.classes.spending_fed_2017dollars
Tunnel_Summary = Base.classes.tunnel_condition_summary
Tunnels = Base.classes.tunnels


# define route for / render form
@app.route('/')
def index():

    js_config = API_KEY

    return render_template('index.html', js_config=js_config)
    # return render_template('index.html')


# define route for /bridge_crashes render form
@app.route('/bridge_crashes')
def bridge_crashes():
    return render_template('bridge_crashes.html')


# define end point for state stats; use abbreviation (e.g., VA)
@app.route('/api/<state>')
def state_infrastructure(state):

    # start session
    session = Session(engine)

    # query for state data
    results1 = session.query(Centerpoints).filter(Centerpoints.State_Abbreviation == state).all()
    
    results2 = session.query(
        # Bridges.State_Code,
        Bridges.Features_Intersected,
        Bridges.Facility_Carried,
        Bridges.Lat,
        Bridges.Long,
        Bridges.Year_Built,
        # Bridges.Avg_Daily_Traffic,
        Bridges.Structure_Kind,
        # Bridges.Length,
        # Bridges.Improvement_Cost,
        # Bridges.Year_Reconstructed,
        # Bridges.Percent_Truck_Traffic,
        Bridges.Score
        # Bridges.State_Abbreviation
    ).filter(Bridges.State_Abbreviation == state)
    
    results3 = session.query(Estimate_Bridge).filter(Estimate_Bridge.State_Abbreviation == state).all()

    results4 = session.query(
        Spending_byState.Year,
        Spending_byState.Total_Hwy_DirExp,
        Spending_byState.Total_Hwy_CurOp,
        Spending_byState.Total_Hwy_CapOut,
    ).filter(Spending_byState.State_Abbreviation == state)

    results5 = session.query(
        Tunnels.Tunnel_Name,
        Tunnels.State_Code,
        Tunnels.Latitude,
        Tunnels.Longitude,
        Tunnels.Route_Type,
        Tunnels.Year_Built,
        Tunnels.Lanes,
        Tunnels.Length,
        Tunnels.Condition
    ).filter(Tunnels.State_Abbreviation == state)

    results6 = session.query(Bridge_Summary).filter(Bridge_Summary.Year == 2018).filter(Bridge_Summary.State_Abbreviation == state)

    results7 = session.query(Road_Summary).filter(Road_Summary.State_Abbreviation == state)

    results8 = session.query(Tunnel_Summary).filter(Tunnel_Summary.State_Abbreviation == state)

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
            # "State": result[0],
            "Feature_Intersected": result[0],
            "Facility_Carried": result[1],
            "Latitude": result[2],
            "Longitude": result[3],
            "Year_Built": result[4],
            # "Avg_Daily_Traffic": result[6],
            "Structure_Kind": result[5],
            # "Length": result[8],
            # "Improvement_Cost": result[9],
            # "Year_Reconstructed": result[10],
            # "Percent_Truck_Traffic": result[11],
            "Score": result[6]
            # "State_Abbreviation": result[13]
        })
    
    cost_estimate = {
        "Count": results3[0].Count,
        "Area": results3[0].Area,
        "Replacement_Cost": results3[0].Estimated_Total_Cost_of_Replacement,
        "Rehab_Cost": results3[0].Estimated_Total_Cost_of_Rehab
    }

    state_spending = []

    for result in results4:
        state_spending.append({
            "Year": result[0],
            "Total_Hwy_DirExp": result[1],
            "Total_Hwy_CurOp": result[2],
            "Total_Hwy_CapOut": result[3],
        })

    tunnels = []

    for result in results5:
        tunnels.append({
            "Tunnel_Name": result[0],
            "State_Code": result[1],
            "Latitude": result[2],
            "Longitude": result[3],
            "Route_Type": result[4],
            "Year_Built": result[5],
            "Lanes": result[6],
            "Length": result[7],
            "Condition": result[8]
        })

    bridge_summary = {
        "Year": results6[0].Year,
        "State": results6[0].State,
        "Count_All": results6[0].Count_All,
        "Count_Good": results6[0].Count_Good,
        "Count_Fair": results6[0].Count_Fair,
        "Count_Poor": results6[0].Count_Poor,
        "State_Abbreviation": results6[0].State_Abbreviation
    }

    road_summary = []

    road_summary = {
        "State": results7[0].State,
        "Total": results7[0].Total,
        "NotReported_Percentage": results7[0].NotReported_Percentage,
        "Good_Percentage": results7[0].Good_Percentage,
        "Fair_Percentage": results7[0].Fair_Percentage,
        "Poor_Percentage": results7[0].Poor_Percentage,
        "State_Abbreviation": results7[0].State_Abbreviation
    }
        
    tunnel_summary = {
        "State": results8[0].State,
        "Total": results8[0].Total,
        "Condition_State_1_Percentage": results8[0].Condition_State_1_Percentage*100,
        "Condition_State_2_Percentage": results8[0].Condition_State_2_Percentage*100,
        "Condition_State_3_Percentage": results8[0].Condition_State_3_Percentage*100,
        "Condition_State_4_Percentage": results8[0].Condition_State_4_Percentage*100,
        "State_Abbreviation": results8[0].State_Abbreviation
    }

    state_data = {
        "Location": location,
        "Bridge_Data": bridges,
        "Bridges_in_Poor_Condition": cost_estimate,
        "Tunnel_Data": tunnels,
        "Spending": state_spending,
        "Bridge_Summary": bridge_summary,
        "Road_Summary": road_summary,
        "Tunnel_Summary": tunnel_summary
    }
    
    return jsonify(state_data)


# define route for / render form
@app.route('/api/spending')
def spending():

    # start session
    session = Session(engine)

    # query for all records
    results1 = session.query(Spending_byState).all()
    results2 = session.query(Spending_byState_Fraction).all()
    results3 = session.query(Spending_byState_perCapita).all()
    results4 = session.query(
        Spending_State.Year,
        Spending_State.All_Total,
        Spending_State.All_Capital,
        Spending_State.All_OM,
        Spending_State.Highways_Total,
        Spending_State.Highways_Capital,
        Spending_State.Highway_OM
    ).all()
    results5 = session.query(
        Spending_Fed.Year,
        Spending_Fed.All_Total,
        Spending_Fed.All_Capital,
        Spending_Fed.All_OM,
        Spending_Fed.Highways_Total,
        Spending_Fed.Highways_Capital,
        Spending_Fed.Highway_OM
    ).all()
    results6 = session.query(
        Spending_National.Year,
        Spending_National.All_Total,
        Spending_National.All_Capital,
        Spending_National.All_OM,
        Spending_National.Highways_Total,
        Spending_National.Highways_Capital,
        Spending_National.Highway_OM
    ).all()
    results7 = session.query(Spending_National_percentGDP).all()
    results8 = session.query(Spending_OECD).all()

    # end session
    session.close()

    spending_bystate = []
    spending_bystate_fraction = []
    spending_bystate_percapita = []
    spending_state = []
    spending_fed = []
    spending_national = []
    spending_national_percentgdp = []
    spending_oecd = []

    for result in results1:
        spending_bystate.append({
            "State": result.State,
            "Year": result.Year,
            "Total_Revenue": result.Total_Revenue,
            "Total_Expenditure": result.Total_Expenditure,
            "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
            "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
            "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })
    
    for result in results2:
        spending_bystate_fraction.append({
            "State": result.State,
            "Year": result.Year,
            "Total_Revenue": result.Total_Revenue,
            "Total_Expenditure": result.Total_Expenditure,
            "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
            "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
            "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })

    for result in results3:
        spending_bystate_percapita.append({
            "State": result.State,
            "Year": result.Year,
            "Total_Revenue": result.Total_Revenue,
            "Total_Expenditure": result.Total_Expenditure,
            "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
            "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
            "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
            "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
            "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
            "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
            "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
            "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
            "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
            "State_Abbreviation": result.State_Abbreviation
        })

    for result in results4:
        spending_state.append({
            "Year": result[0],
            "All_Total": result[1],
            "All_Capital": result[2],
            "All_OM": result[3],
            "Highways_Total": result[3],
            "Highways_Capital": result[4],
            "Highway_OM": result[5]
        })
    
    for result in results5:
        spending_fed.append({
            "Year": result[0],
            "All_Total": result[1],
            "All_Capital": result[2],
            "All_OM": result[3],
            "Highways_Total": result[3],
            "Highways_Capital": result[4],
            "Highway_OM": result[5]
        })

    for result in results6:
        spending_national.append({
            "Year": result[0],
            "All_Total": result[1],
            "All_Capital": result[2],
            "All_OM": result[3],
            "Highways_Total": result[3],
            "Highways_Capital": result[4],
            "Highway_OM": result[5]
        })

    for result in results7:
        spending_national_percentgdp.append({
            "Year": result.Year,
            "Federal_BillionsOf2017Dollars": result.Federal_BillionsOf2017Dollars,
            "StateLocal_BillionsOf2017Dollars": result.StateLocal_BillionsOf2017Dollars,
            "Federal_percentGDP": result.Federal_percentGDP,
            "StateLocal_percentGDP": result.StateLocal_percentGDP
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

    spending = {
        "Spending_by_State:": spending_bystate,
        "Spending_by_State_fractExp": spending_bystate_fraction,
        "Spending_by_State_perCapita": spending_bystate_percapita,
        "Total_State_Spending": spending_state,
        "Total_Fed_Spending": spending_fed,
        "Total_National_Spending": spending_national,
        "National_Spending_percentGDP": spending_national_percentgdp,
        "Global": spending_oecd
    }

    return jsonify(spending)


# define end point for DC pothole information
@app.route('/api/dc_potholes')
def dc_potholes():

    # start session
    session = Session(engine)

    # query for all records
    results = session.query(
        Potholes.ADDDATE,
        Potholes.SERVICEORDERSTATUS,
        Potholes.STREETADDRESS,
        Potholes.LATITUDE,
        Potholes.LONGITUDE,
        Potholes.ZIPCODE
        ).all()

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


# define end point for DC pothole information
@app.route('/api/ny_crash')
def ny_crash():

    # start session
    session = Session(engine)

    # query for all records
    results = session.query(
        Crashes.Crash_Descriptor,
        Crashes.Date,
        Crashes.Municipality,
        Crashes.County_Name
        ).all()

    # end session
    session.close()

    crashes = []

    for result in results:
        crashes.append({
            "Crash_Descriptor": result[0],
            "Date": result[1],
            "Municipality": result[2],
            "County_Name": result[3]
        })

    return jsonify(crashes)


if __name__ == '__main__':
    app.run(debug=True)