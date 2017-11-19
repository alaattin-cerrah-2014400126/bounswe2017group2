package com.swegroup2.lookingforconcerts;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by Pınar on 15.11.2017.
 */

public class UserDto {
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

    @SerializedName("birth_date")
    @Expose()
    public String birthDate;

    @SerializedName("date_joined")
    @Expose()
    public String dateJoined;

    @SerializedName("is_active")
    @Expose()
    public Boolean isActive;

    @SerializedName("avatar")
    @Expose()
    public String avatar;

    @SerializedName("comments")
    @Expose()
    public List<ConcertComment> comments;

    @SerializedName("concerts")
    @Expose()
    public List<Integer> concerts;
}