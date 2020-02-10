# import Flask
from flask import Flask, render_template, jsonify, request

# import SQL Alchemy
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# import PyMySQL
# import pymysql

# import Pandas
import pandas as pd

# import Numpy
import numpy as np

# import JSON
import json

# import OS
import os

# import config files
#from config import remote_gwsis_dbuser, remote_gwsis_dbpwd, remote_db_host, remote_db_port, remote_gwsis_dbname
# remote_gwsis_dbuser = os.environ.get("remote_gwsis_dbuser")
# remote_gwsis_dbpwd = os.environ.get("remote_gwsis_dbpwd")
# remote_db_host = os.environ.get("remote_db_host")
# remote_db_port = os.environ.get("remote_db_port")
# remote_gwsis_dbname = os.environ.get("remote_gwsis_dbname")

# configure MySQL connection
#pymysql.install_as_MySQLdb()
#engine = create_engine(f'mysql://{remote_gwsis_dbuser}:{remote_gwsis_dbpwd}@{remote_db_host}:{remote_db_port}/{remote_gwsis_dbname}')
# conn = engine.connect()

# initialize flask application
app = Flask(__name__)

# set up SQL Alchemy connection and classes
# Base = automap_base()
# Base.prepare(engine, reflect=True)
# Base.classes.keys()
# Bridges = Base.classes.bridges
# Centerpoints = Base.classes.centerpoints
# Potholes = Base.classes.dc_potholes
# Estimate_Bridge = Base.classes.estimate_bridge_cost_2018dollars
# Crashes = Base.classes.ny_crash_ditch
# Roads = Base.classes.roads
# Spending_byState = Base.classes.spending_bystate_2017dollars
# Spending_byState_Fraction = Base.classes.spending_bystate_fraction_exp
# Spending_byState_perCapita = Base.classes.spending_bystate_percapita_2017dollars
# Spending_State = Base.classes.spending_state_2017dollars
# Spending_OECD = Base.classes.spending_oecd_2018euros
# Spending_National_percentGDP = Base.classes.spending_fedstate_percentgdp
# Spending_National = Base.classes.spending_fedstate_2017dollars
# Spending_Fed = Base.classes.spending_fed_2017dollars
# Tunnels = Base.classes.tunnels

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

json_url = os.path.join(SITE_ROOT, "data", "infrastructure_condition_2018.json")
data = json.load(open(json_url))

# define route for / render form
@app.route('/')
def index():
    return render_template('index.html')


@app.route("/data")
def get_data():
    global data
    return json.dumps(data)

# define end point for state state; use abbreviation (e.g., VA)
# @app.route('/api/<state>')
# def state_infrastructure(state):

#     # start session
#     session = Session(engine)

#     # query for state data
#     results1 = session.query(Centerpoints).filter(Centerpoints.State_Abbreviation == state).all()
    
#     results2 = session.query(
#         # Bridges.State_Code,
#         Bridges.Lat,
#         Bridges.Long,
#         Bridges.Year_Built,
#         # Bridges.Avg_Daily_Traffic,
#         Bridges.Structure_Kind,
#         # Bridges.Length,
#         # Bridges.Improvement_Cost,
#         # Bridges.Year_Reconstructed,
#         # Bridges.Percent_Truck_Traffic,
#         Bridges.Score
#         # Bridges.State_Abbreviation
#     ).filter(Bridges.State_Abbreviation == state)
    
#     results3 = session.query(Estimate_Bridge).filter(Estimate_Bridge.State_Abbreviation == state).all()

#     # results4 = session.query(
#     #     Tunnels.Tunnel_Name
#     #     Tunnels.Tunnel_Name
#     # )

#     # end session
#     session.close()

#     location = {
#         "State": results1[0].State,
#         "State_Abbreviation": results1[0].State_Abbreviation,
#         "Latitude": results1[0].Latitude,
#         "Longitude": results1[0].Longitude,
#     }

#     bridges = []

#     for result in results2:
#         bridges.append({
#             # "State": result[0],
#             "Latitude": result[0],
#             "Longitude": result[1],
#             "Year_Built": result[2],
#             # "Avg_Daily_Traffic": result[4],
#             "Structure_Kind": result[3],
#             # "Length": result[6],
#             # "Improvement_Cost": result[7],
#             # "Year_Reconstructed": result[8],
#             # "Percent_Truck_Traffic": result[9],
#             "Score": result[4]
#             # "State_Abbreviation": result[11]
#         })
    
#     cost_estimate = {
#         "Count": results3[0].Count,
#         "Area": results1[0].Area,
#         "Cost to Replace": results1[0].Estimated_Total_Cost_of_Replacement,
#         "Cost to Rehab": results1[0].Estimated_Total_Cost_of_Rehab
#     }

#     state_data = {
#         "Location": location,
#         "Bridge Data": bridges,
#         "Bridges in Poor Condition": cost_estimate 
#     }
    
#     return jsonify(state_data)


# # define route for / render form
# @app.route('/api/spending')
# def spending():

#     # start session
#     session = Session(engine)

#     # query for all records
#     results1 = session.query(Spending_byState).all()
#     results2 = session.query(Spending_byState_Fraction).all()
#     results3 = session.query(Spending_byState_perCapita).all()
#     results4 = session.query(
#         Spending_State.Year,
#         Spending_State.All_Total,
#         Spending_State.All_Capital,
#         Spending_State.All_OM,
#         Spending_State.Highways_Total,
#         Spending_State.Highways_Capital,
#         Spending_State.Highway_OM
#     ).all()
#     results5 = session.query(
#         Spending_Fed.Year,
#         Spending_Fed.All_Total,
#         Spending_Fed.All_Capital,
#         Spending_Fed.All_OM,
#         Spending_Fed.Highways_Total,
#         Spending_Fed.Highways_Capital,
#         Spending_Fed.Highway_OM
#     ).all()
#     results6 = session.query(
#         Spending_National.Year,
#         Spending_National.All_Total,
#         Spending_National.All_Capital,
#         Spending_National.All_OM,
#         Spending_National.Highways_Total,
#         Spending_National.Highways_Capital,
#         Spending_National.Highway_OM
#     ).all()
#     results7 = session.query(Spending_National_percentGDP).all()
#     results8 = session.query(Spending_OECD).all()

#     # end session
#     session.close()

#     spending_bystate = []
#     spending_bystate_fraction = []
#     spending_bystate_percapita = []
#     spending_state = []
#     spending_fed = []
#     spending_national = []
#     spending_national_percentgdp = []
#     spending_oecd = []

#     for result in results1:
#         spending_bystate.append({
#             "State": result.State,
#             "Year": result.Year,
#             "Total_Revenue": result.Total_Revenue,
#             "Total_Expenditure": result.Total_Expenditure,
#             "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
#             "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
#             "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
#             "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
#             "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
#             "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
#             "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
#             "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
#             "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
#             "State_Abbreviation": result.State_Abbreviation
#         })
    
#     for result in results2:
#         spending_bystate_fraction.append({
#             "State": result.State,
#             "Year": result.Year,
#             "Total_Revenue": result.Total_Revenue,
#             "Total_Expenditure": result.Total_Expenditure,
#             "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
#             "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
#             "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
#             "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
#             "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
#             "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
#             "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
#             "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
#             "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
#             "State_Abbreviation": result.State_Abbreviation
#         })

#     for result in results3:
#         spending_bystate_percapita.append({
#             "State": result.State,
#             "Year": result.Year,
#             "Total_Revenue": result.Total_Revenue,
#             "Total_Expenditure": result.Total_Expenditure,
#             "Total_Hwy_DirExp": result.Total_Hwy_DirExp,
#             "Total_Hwy_CurOp": result.Total_Hwy_CurOp,
#             "Total_Hwy_CapOut": result.Total_Hwy_CapOut,
#             "Regular_Hwy_DirExp": result.Regular_Hwy_DirExp,
#             "Regular_Hwy_CurOp": result.Regular_Hwy_CurOp,
#             "Regular_Hwy_CapOut": result.Regular_Hwy_CapOut,
#             "Toll_Hwy_TotalExp": result.Toll_Hwy_TotalExp,
#             "Toll_Hwy_CurOp": result.Toll_Hwy_CurOp,
#             "Toll_Hwy_CapOut": result.Toll_Hwy_CapOut,
#             "State_Abbreviation": result.State_Abbreviation
#         })

#     for result in results4:
#         spending_state.append({
#             "Year": result[0],
#             "All_Total": result[1],
#             "All_Capital": result[2],
#             "All_OM": result[3],
#             "Highways_Total": result[3],
#             "Highways_Capital": result[4],
#             "Highway_OM": result[5]
#         })
    
#     for result in results5:
#         spending_fed.append({
#             "Year": result[0],
#             "All_Total": result[1],
#             "All_Capital": result[2],
#             "All_OM": result[3],
#             "Highways_Total": result[3],
#             "Highways_Capital": result[4],
#             "Highway_OM": result[5]
#         })

#     for result in results6:
#         spending_national.append({
#             "Year": result[0],
#             "All_Total": result[1],
#             "All_Capital": result[2],
#             "All_OM": result[3],
#             "Highways_Total": result[3],
#             "Highways_Capital": result[4],
#             "Highway_OM": result[5]
#         })

#     for result in results7:
#         spending_national_percentgdp.append({
#             "Year": result.Year,
#             "Federal_BillionsOf2017Dollars": result.Federal_BillionsOf2017Dollars,
#             "StateLocal_BillionsOf2017Dollars": result.StateLocal_BillionsOf2017Dollars,
#             "Federal_percentGDP": result.Federal_percentGDP,
#             "StateLocal_percentGDP": result.StateLocal_percentGDP
#         })
    
#     for result in results8:
#         spending_oecd.append({
#             "Country": result.Country,
#             "Investment_Amount": result.Investment_Amount,
#             "Investment_Type": result.Investment_Type,
#             # "Measure": result.Measure,
#             # "Population": result.Population,
#             "Year": result.Year,
#             "Spending_perCapita": result.Spending_perCapita,
#         })

#     spending = [{
#         "Spending by State:": spending_bystate,
#         "Spending by State (Fraction of Expenditure)": spending_bystate_fraction,
#         "Spending by State (per Capita)": spending_bystate_percapita,
#         "Total State Spending": spending_state,
#         "Total Fed Spending": spending_fed,
#         "Total National Spending": spending_national,
#         "National Spending (percent GDP)": spending_national_percentgdp,
#         "Global": spending_oecd
#     }]

#     return jsonify(spending)


# # define end point for DC pothole information
# @app.route('/api/dc_potholes')
# def dc_potholes():

#     # start session
#     session = Session(engine)

#     # query for all records
#     results = session.query(
#         Potholes.ADDDATE,
#         Potholes.SERVICEORDERSTATUS,
#         Potholes.STREETADDRESS,
#         Potholes.LATITUDE,
#         Potholes.LONGITUDE,
#         Potholes.ZIPCODE
#         ).all()

#     # end session
#     session.close()

#     potholes = []

#     for result in results:
#         potholes.append({
#             "add_date": result[0],
#             "service_order_status": result[1],
#             "street_address": result[2],
#             "latitude": result[3],
#             "longitude": result[4],
#             "zip_code": result[5]
#         })

#     return jsonify(potholes)


if __name__ == '__main__':
    app.run(debug=True)
