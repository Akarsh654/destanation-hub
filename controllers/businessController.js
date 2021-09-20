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
    businessType = req.body.business_type
    businessOwnerId = req.body.user_id
    console.log('business  ownerId: ', businessOwnerId)
    Business.findOne({ businessName : businessName })
    .then(business => {
        if(!business) {
            const newBusiness = new Business({ businessOwnerId, businessName,businessType, businessWebsiteUrl, businessMobileNumber ,businessDescription, businessAddress, keywords }); 
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
                            message: error
                          })
        }
    })
  }

  exports.get_businesses = async function(req, res, next){
      console.log("I got here")
      user_id = req.params.user_id
      businesses = await Business.find({businessOwnerId: user_id}).lean(); 
      console.log('business: ', businesses); 
      return res.status(200)
         .json({
             'data': businesses
         })
  }

  exports.get_unclaimed_businesses = async function(req, res, next){
      console.log("I got here")
      businesses = await Business.find({verified: 0}).lean(); 
      console.log('business: ', businesses); 
      return res.status(200)
         .json({
             'data': businesses
         })
  }

  exports.get_other_businesses = async function(req, res, next){
      user_id = req.params.user_id
      console.log('user_id: ',user_id)
      businesses = await Business.find({businessOwnerId:{$ne:user_id},verified: 1})

      return res.status(200)
         .json({
             'data': businesses
         })
  }

  exports.connect = async function(req, res, next){
    //   user_id = req.params.user_id 
    //   other_user_id = req.params.other_user
  }


  exports.listings = async function(req, res, next){

        businesses = await Business.find().limit(9)
        console.log(businesses)

        res.render('listings')
            .json({'businesses': businesses})//{'businesses': JSON.stringify(businesses)})
  }

  exports.businessDetails = async function(req, res, next){
    //   businessId = req.params.id
    //   console.log('id: ', businessId)
    //   business = await Business.find({_id: businessId}).lean()
    //   console.log(business)

      return res.render('business-details')// {'business':business})

    //   return res.render('business-details', {'business':business})
                // .json({'business':business})
  }