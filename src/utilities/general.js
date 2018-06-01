module.exports = {
    getFormatTime : function(inputDate,isDateTime){
        if(inputDate!=null){
            outputDate = new Date(inputDate).toISOString(inputDate).replace(/T/, ' ').replace(/\..+/, '');
            var formattedDate = new Date(outputDate);
            if(!isDateTime){
              return formattedDate.getHours() + ":" + formattedDate.getMinutes() + ":" + formattedDate.getSeconds();  
            }else{
              return module.exports.formatAMPM(formattedDate);  
            }
        }else{
            return "";
        }   
    },
    formatAMPM : function(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var dateToShow = date.getUTCDate();
      var monthToShow = date.getUTCMonth() + 1;
      var yearToShow = date.getUTCFullYear();
      var dmyDate = dateToShow + "/"+monthToShow + "/" + yearToShow;
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = dmyDate + " " + hours + ':' + minutes + ' ' + ampm;
      return strTime;
    },
    
    getTagIdStatus : function(jobTagId,driversArr,callback){
    var tag_id_status = "active";
    if(driversArr.length>0){
      driversArr.forEach(function(o){
      if (o.tag_id == jobTagId){
        tag_id_status =  o.tag_id_status;
      }
    });
    }
    //return tag_id_status;
      callback(tag_id_status);
    }
}