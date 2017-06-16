import {Mongo} from 'meteor/mongo';

export const RawBeans = new Mongo.Collection("rawBeans");
export const RoastedBeans = new Mongo.Collection("roastedBeans");


export const CoffeeProcesses = new Mongo.Collection("coffeeProcesses");
export const CoffeeCultivars = new Mongo.Collection("coffeeCultivars");
export const CoffeeAreas = new Mongo.Collection("coffeeAreas");
export const CoffeeCountries = new Mongo.Collection("coffeeCountries");
export const CoffeeRegions = new Mongo.Collection("coffeeRegions");
