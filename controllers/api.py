def get_forme_weaves():
    results =[]
    my_memberships = db(db.weave_membership.user_id == auth.user.id).select()

    for m in my_memberships:
        weave = db(db.weave.id == m.weave_id).select().first()
        if weave.creator != auth.user.email:
            results.append(dict(
            id=weave.id,
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select()
        ))
    
    return response.json(dict(results=results))


def get_fromme_weaves():
    results =[]
    for weave in db(db.weave.creator == auth.user.email).select(orderby=~db.weave.id):
        results.append(dict(
            id=weave.id,
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select(),
        ))
    return response.json(dict(results=results))


def get_forothers_weaves():
    results =[]
    for weave in db().select(db.weave.ALL, limitby=(0,10)):
        results.append(dict(
            id=weave.id,
            title=weave.title,
            purpose=weave.purpose,
            creator=weave.creator,
            members=db(db.weave_membership.weave_id == weave.id).select(),
        )) 
    return response.json(dict(results=results))


def get_users():
    users = db(db.auth_user).select()
    return response.json(dict(results=users))

def create_weave():
    weave_id = db.weave.insert(
        title = request.vars.title,
        purpose = request.vars.purpose,
        creator = auth.user.email,
    )
    for i in range(0, int(request.vars.number_of_users)):
        weave_membership_id = db.weave_membership.insert(
            weave_id = weave_id,
            user_id = request.vars['members[' + str(i) + '][id]'],
            user_email = request.vars['members[' + str(i) + '][email]'],
            weave_title = request.vars.title,
        )
    return response.json(dict(id=weave_id))

def delete_weave():
    print('in delete weave')
    print(request.vars.id)
    db(db.weave.id == request.vars.id).delete()
    return "success"