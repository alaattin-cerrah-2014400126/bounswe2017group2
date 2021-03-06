package com.swegroup2.lookingforconcerts.user;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.swegroup2.lookingforconcerts.concert.ConcertComment;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Pınar on 15.11.2017.
 */

public class UserDto implements Serializable {

    @SerializedName("id")
    @Expose()
    public Integer id;

    @SerializedName("username")
    @Expose()
    public String username;

    @SerializedName("email")
    @Expose()
    public String email;

    @SerializedName("password")
    @Expose()
    public String password;

    @SerializedName("first_name")
    @Expose()
    public String firstName;

    @SerializedName("last_name")
    @Expose()
    public String lastName;

    @SerializedName("spotify_display_name")
    @Expose()
    public String spotifyDisplayName;

    @SerializedName("birth_date")
    @Expose()
    public String birthDate;

    @SerializedName("date_joined")
    @Expose()
    public String dateJoined;

    @SerializedName("is_active")
    @Expose()
    public Boolean isActive;

    @SerializedName("image")
    @Expose()
    public String image;

    @SerializedName("comments")
    @Expose()
    public List<Integer> comments;

    @SerializedName("concerts")
    @Expose()
    public List<Integer> concerts;

    @SerializedName("followers")
    @Expose()
    public List<UserDto> followers;

    @SerializedName("following")
    @Expose()
    public List<UserDto> following;

    @SerializedName("sent_user_reports")
    @Expose()
    public List<UserReport> sentUserReports;

    @SerializedName("received_user_reports")
    @Expose()
    public List<UserReport> receivedUserReports;
}
