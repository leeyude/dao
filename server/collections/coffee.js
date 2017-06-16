import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {
  CoffeeProcesses,
  CoffeeCultivars,
  CoffeeAreas,
  CoffeeCountries,
  CoffeeRegions
} from '../../imports/collections/coffee/coffee.js';

if(Meteor.isServer){
  Meteor.methods({
    updateOtherCoffeeData: function(id, schema, isAdding, queryObject, updatingObject){

      if(isAdding){
        if(id =='process'){
          CoffeeProcesses.insert(queryObject);
        }else if(id =='cultivar'){
          CoffeeCultivars.insert(queryObject);
        }else if(id =='area'){
          CoffeeAreas.insert(queryObject);
        }else if(id =='country'){
          CoffeeCountries.insert(queryObject);
        }else if(id =='region'){
          CoffeeRegions.insert(queryObject);
        };
      }else{
        if(id =='process'){
          CoffeeProcesses.update(updatingObject._id, {
            $set: queryObject
          });
        }else if(id =='cultivar'){
          CoffeeCultivars.update(updatingObject._id, {
            $set: queryObject
          });
        }else if(id =='area'){
          CoffeeAreas.update(updatingObject._id, {
            $set: queryObject
          });
        }else if(id =='country'){
          CoffeeCountries.update(updatingObject._id, {
            $set: queryObject
          });
        }else if(id =='region'){
          CoffeeRegions.update(updatingObject._id, {
            $set: queryObject
          });
        };
      };
    },

    deleteOtherCoffeeData: function(id, targetObject){
      if(id =='process'){
        CoffeeProcesses.remove(targetObject._id);
      }else if(id =='cultivar'){
        CoffeeCultivars.remove(targetObject._id);
      }else if(id =='area'){
        CoffeeAreas.remove(targetObject._id);
      }else if(id =='country'){
        CoffeeCountries.remove(targetObject._id);
      }else if(id =='region'){
        CoffeeRegions.remove(targetObject._id);
      };
    },

  });
};

Meteor.publish("otherProductionRelatedData", function(id){
  if(id =='process'){
    return CoffeeProcesses.find();
  }else if(id =='cultivar'){
    return CoffeeCultivars.find();
  }else if(id =='area'){
    return CoffeeAreas.find();
  }else if(id =='country'){
    return CoffeeCountries.find();
  }else if(id =='region'){
    return CoffeeRegions.find();
  };
});
