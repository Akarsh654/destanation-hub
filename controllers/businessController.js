var express = require('express');
var router = express.Router();
const Business = require('../models/business')
const passport = require('passport')
const bcrypt = require("bcryptjs")
var path = require('path')
const fs = require('fs');
const crypto = require('crypto')
const { promisify } = require('util')
const jsonwebtoken = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const Str = require('@supercharge/strings')

const transport = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
}));

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');




exports.post_register = function(req, res, next){
    businessName = req.body.business_name
    businessMobileNumber = req.body.business_mobile_no
    businessDescription = req.body.business_description
    keywords = req.body.business_keywords
    businessAddress = req.body.business_address
    businessWebsiteUrl = req.body.business_website_url

    console.log('business  moible: ', businessMobileNumber)
    Business.findOne({ businessName : businessName })
    .then(business => {
        if(!business) {
            const newBusiness = new Business({ businessName, businessWebsiteUrl, businessMobileNumber ,businessDescription, businessAddress, keywords }); 
            newBusiness.save()
                        .then(business=>{
                            return res.json({
                                success: true, 
                                business: business, 
                                message: "Business Created Successfully"
                            })
                        })
                        .catch(err => {
                            console.log('err: ', err)
                            return res.status(404)
                                      .json({
                                        success: false, 
                                        message: err.Error
                                      })
                          }); 
        } else {
                error = "There's a business registered with this name already"
                return res.status(404)
                          .json({
                            success: false, 
                            message: "Error with registration"
                          })
        }
    })
  }

  exports.get_businesses = async function(req, res, next){
      businesses = await Business.find({}).lean(); 
      console.log('business: ', businesses); 
      return res.status(200)
         .json({
             'data': businesses
         })
  }